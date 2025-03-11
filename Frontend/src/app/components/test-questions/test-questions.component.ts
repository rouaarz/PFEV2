import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Ajoute cette ligne
import { HttpClient,HTTP_INTERCEPTORS,HttpHeaders  } from '@angular/common/http';  // Assure-toi que c'est bien importé
import { Router } from '@angular/router'; // Importe le Router
import { AuthInterceptor } from '../../interceptors/auth.interceptor'; // Importer l'intercepteur

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.css',
  
  imports: [CommonModule, FormsModule // Ajoute ceci

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Utilisation de l'intercepteur
      multi: true
  }],
  standalone: true, 
})

export class TestQuestionsComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  testTitle: string = 'Test en Cours'; // Valeur par défaut
  testId!: number; // ID du test
  selectedOptionIds: number[] = [];  // Liste des options sélectionnées
  developpeurId!: number; // Valeur constante pour l'ID du développeur
  responses: { [key: number]: number[] } = {}; // Stocke les réponses par question

  totalTime!: number ; // Temps total en secondes
  remainingTime: number = this.totalTime; // Temps restant
  timerInterval: any; // Intervalle du timer
  isAnswered: boolean = false; // Ajout de la propriété `isAnswered`
  
  session: any; // Propriété pour stocker la session (si besoin)
  remainingHours: number = 0;
  remainingMinutes: number = 0;
  remainingSeconds: number = 0;

  constructor(private testService: TestService,private router: Router, private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
  if (!token) {
    alert('⚠ Vous devez être connecté pour accéder au test.');
    this.router.navigate(['/signin']);
    return; // Arrêter l'exécution
  }
    this.loadSavedResponses();
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex]?.id] || [];
    this.markAnswered();
    const storedId = localStorage.getItem('developpeurId');
    if (!storedId) {
      console.error("❌ developpeurId est undefined !");
    } else {
      this.developpeurId = Number(storedId); // Convertit en nombre et stocke
      console.log("✅ developpeurId récupéré :", this.developpeurId);
    }
    this.getTestDetails();

    this.testService.getQuestionsForTest(this.testId).subscribe({
      next: (data) => {
        this.questions = data;
        console.log('Questions :', this.questions);
        this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex]?.id] || [];
        this.markAnswered();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des questions :', error);
      }
    });

    
  }
  loadSavedResponses() {
    const savedResponses = localStorage.getItem('responses');
    if (savedResponses) {
      this.responses = JSON.parse(savedResponses); // Récupérer les réponses depuis le localStorage
    }
  }
  toggleSelection(optionId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      this.selectedOptionIds.push(optionId);
    } else {
      this.selectedOptionIds = this.selectedOptionIds.filter(id => id !== optionId);
    }
  
    this.isAnswered = this.selectedOptionIds.length > 0; // ✅ Vérifie si au moins une option est sélectionnée
  
    console.log("Options sélectionnées :", this.selectedOptionIds);
    console.log("isAnswered:", this.isAnswered);
  }
  
  
  getTestDetails(): void {
    this.testService.getTestById(this.testId).subscribe(test => {
    this.testTitle = test.titre; // Mettre à jour le titre
    if (test.duree != null) { 
      this.totalTime = test.duree * 60; // ✅ Mettre à jour le temps uniquement si duree n'est pas null
      this.remainingTime = this.totalTime;
      this.startTimer(); // ✅ Démarrer le timer uniquement si la durée est définie
    }

    });
  }
  // Fonction de mise à jour du timer
  updateTimer() {
    this.remainingTime--;
    this.remainingHours = Math.floor(this.remainingTime / 3600); // Calcul des heures restantes
    this.remainingMinutes = Math.floor((this.remainingTime % 3600) / 60); // Calcul des minutes restantes
    this.remainingSeconds = this.remainingTime % 60; // Calcul des secondes restantes

    const timerElement = document.querySelector('.timer-text');
    const progressCircle = document.querySelector('.timer-progress') as SVGCircleElement;

    if (timerElement && progressCircle) {
      timerElement.textContent = `${this.remainingHours}:${this.remainingMinutes}:${this.remainingSeconds}`;
  
      // Calcul du pourcentage restant
      const offset = (440 * this.remainingTime) / this.totalTime;
      progressCircle.style.strokeDashoffset = offset.toString();
  
      // Ajouter la classe 'almost-done' quand il reste moins de 10 secondes
      if (this.remainingTime <= 10) {
        progressCircle.classList.add('almost-done');
      } else {
        progressCircle.classList.remove('almost-done');
      }
  
      // Arrêter le timer quand le temps est écoulé
      if (this.remainingTime <= 0) {
        clearInterval(this.timerInterval);
        alert('Le temps est écoulé !');
        this.submitTest();
      }
    }
  }

  // Fonction pour démarrer le timer
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }
  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }
  terminerTest() {
    console.log("🔍 developpeurId dans terminerTest():", this.developpeurId);
    if (!this.developpeurId) {
      console.error("Erreur : developpeurId est undefined !");
      alert("Votre identifiant de développeur est introuvable. Veuillez réessayer.");
      return;
    }
    alert("Test terminé ! Vos réponses ont été envoyées.");
    this.enregistrerReponse(this.questions[this.currentQuestionIndex].id, this.selectedOptionIds);

    this.router.navigate(['/test', this.testId, 'score', this.developpeurId]);
    localStorage.removeItem('responses');

  }
  nextQuestion() {
    console.log("isAnswered:", this.isAnswered);
    if (!this.isAnswered) {
      alert('Veuillez répondre à la question avant de passer à la suivante.');
      return;
    }
  
    this.enregistrerReponse(this.questions[this.currentQuestionIndex].id, this.selectedOptionIds);
  
    if (this.isLastQuestion()) {
      // Si c'est la dernière question, soumettre le test
      this.terminerTest();
    } else if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex].id] || []; // ✅ Charger les réponses enregistrées
    this.markAnswered(); 
      // this.isAnswered = false; // Réinitialise pour la nouvelle question
      // this.selectedOptionIds = []; // Réinitialiser la sélection pour la nouvelle question
    }
  }
  

  
  enregistrerReponse(questionId: number, selectedOptionIds: number[]) {
    const token = localStorage.getItem('accessToken'); // Vérifier si le token existe
  
    if (!token) {
      alert('Vous devez être connecté pour soumettre vos réponses.');
      this.router.navigate(['/signin']); // Rediriger vers la page de login si pas de token
      return;
    }
  
    this.responses[questionId] = [...selectedOptionIds]; // Sauvegarder les réponses pour chaque question
    localStorage.setItem('responses', JSON.stringify(this.responses));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
      'Content-Type': 'application/json' // Assurez-vous que le type est correct
    });
  
    this.http.post('http://localhost:8083/api/responses/submit', {
      testId: this.testId,
      questionId: questionId,
      selectedOptionIds: selectedOptionIds,
      developpeurId: this.developpeurId
    }, { headers }).subscribe(
      (response: any) => {
        console.log('Réponse enregistrée', response);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réponse :', error);
      }
    );
    
  }
  isChecked(questionId: number, optionId: number): boolean {
    return this.responses[questionId]?.includes(optionId) ?? false;
  }
  // Soumettre le test
  submitTest() {
    console.log("Test soumis avec les réponses :", this.questions);
    alert("Votre test a été soumis avec succès !");
    clearInterval(this.timerInterval); // Stopper le timer
  }

  // Passer à la question précédente
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex].id] || []; // ✅ Charger les choix précédents
      this.markAnswered(); 
    }
  }
  
  
  
// Marquer la question comme répondue
markAnswered() {
  const currentQuestion = this.questions[this.currentQuestionIndex];

  if (!currentQuestion) return;

  if (currentQuestion.type === 'QCM') {
    this.isAnswered = this.selectedOptionIds.length > 0; // ✅ Vérifie s'il y a des réponses sélectionnées
  } else if (currentQuestion.type === 'Text' || currentQuestion.type === 'Code') {
    const textAreas = document.querySelectorAll('textarea');
    this.isAnswered = Array.from(textAreas).some(textarea => textarea.value.trim().length > 0);
  }

  console.log(`Question ${this.currentQuestionIndex + 1} - Réponse validée :`, this.isAnswered);
}

  
}


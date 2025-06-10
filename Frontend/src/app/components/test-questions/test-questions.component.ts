// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TestService } from '../../services/test.service';
// import { ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms'; // <-- Ajoute cette ligne
// import { HttpClient,HTTP_INTERCEPTORS,HttpHeaders  } from '@angular/common/http';  // Assure-toi que c'est bien importé
// import { Router } from '@angular/router'; // Importe le Router
// import { AuthInterceptor } from '../../interceptors/auth.interceptor'; // Importer l'intercepteur
// import { ScoreService } from '../../services/score.service';
// import { CodeExecutionService } from '../../services/code-execution.service'; // Import du service d'exécution de code

// @Component({
//   selector: 'app-test-questions',
//   templateUrl: './test-questions.component.html',
//   styleUrl: './test-questions.component.css',

//   imports: [CommonModule, FormsModule // Ajoute ceci

//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor, // Utilisation de l'intercepteur
//       multi: true
//   }],
//   standalone: true, 
// })

// export class TestQuestionsComponent implements OnInit {
//   questions: any[] = [];
//   currentQuestionIndex: number = 0;
//   testTitle: string = 'Test en Cours'; // Valeur par défaut
//   testId!: number; // ID du test
//   selectedOptionIds: number[] = [];  // Liste des options sélectionnées
//   developpeurId!: number; // Valeur constante pour l'ID du développeur
//   responses: { [key: number]: number[] } = {}; // Stocke les réponses par question
//   testTermine: boolean = false;
//   token!: string | null; // Ajoute cette ligne

//   totalTime!: number ; // Temps total en secondes
//   remainingTime: number = this.totalTime; // Temps restant
//   timerInterval: any; // Intervalle du timer
//   isAnswered: boolean = false; // Ajout de la propriété `isAnswered`

//   session: any; // Propriété pour stocker la session (si besoin)
//   remainingHours: number = 0;
//   remainingMinutes: number = 0;
//   remainingSeconds: number = 0;
//   score: number | null = null;
//   errorMessage: string | null = null;
//   constructor(private scoreService: ScoreService, private testService: TestService,private router: Router, private route: ActivatedRoute,private http: HttpClient) { }

//   ngOnInit(): void {
//     // const token = localStorage.getItem('accessToken');
//     this.token = localStorage.getItem('accessToken') ?? ''; // Si null, remplace par une chaîne vide
//     if (!this.token) {
//     alert('⚠ Vous devez être connecté pour accéder au test.');
//     this.router.navigate(['/signin']);
//     return; // Arrêter l'exécution
//   }
//     this.loadSavedResponses();
//     this.testId = Number(this.route.snapshot.paramMap.get('testId'));
//     this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex]?.id] || [];
//     this.markAnswered();
//     const storedId = localStorage.getItem('developpeurId');
//     if (!storedId) {
//       console.error("❌ developpeurId est undefined !");
//     } else {
//       this.developpeurId = Number(storedId); // Convertit en nombre et stocke
//       console.log("✅ developpeurId récupéré :", this.developpeurId);
//     }
//     this.getTestDetails();

//     this.testService.getQuestionsForTest(this.testId).subscribe({
//       next: (data) => {
//         this.questions = data;
//         console.log('Questions :', this.questions);
//         this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex]?.id] || [];
//         this.markAnswered();
//       },
//       error: (error) => {
//         console.error('Erreur lors du chargement des questions :', error);
//       }
//     });


//   }
//   loadSavedResponses() {
//     const savedResponses = localStorage.getItem('responses');
//     if (savedResponses) {
//       this.responses = JSON.parse(savedResponses); // Récupérer les réponses depuis le localStorage
//     }
//   }
//   toggleSelection(optionId: number, event: Event) {
//     const isChecked = (event.target as HTMLInputElement).checked;

//     if (isChecked) {
//       this.selectedOptionIds.push(optionId);
//     } else {
//       this.selectedOptionIds = this.selectedOptionIds.filter(id => id !== optionId);
//     }

//     this.isAnswered = this.selectedOptionIds.length > 0; // ✅ Vérifie si au moins une option est sélectionnée

//     console.log("Options sélectionnées :", this.selectedOptionIds);
//     console.log("isAnswered:", this.isAnswered);
//   }


//   getTestDetails(): void {
//     this.testService.getTestById(this.testId).subscribe(test => {
//     this.testTitle = test.titre; // Mettre à jour le titre
//     if (test.duree != null) { 
//       this.totalTime = test.duree * 60; // ✅ Mettre à jour le temps uniquement si duree n'est pas null
//       this.remainingTime = this.totalTime;
//       this.startTimer(); // ✅ Démarrer le timer uniquement si la durée est définie
//     }

//     });
//   }

//   updateTimer() {
//     if (this.remainingTime > 0) {
//       this.remainingTime--;
//       this.remainingHours = Math.floor(this.remainingTime / 3600);
//       this.remainingMinutes = Math.floor((this.remainingTime % 3600) / 60);
//       this.remainingSeconds = this.remainingTime % 60;

//       const timerElement = document.querySelector('.timer-text');
//       const progressCircle = document.querySelector('.timer-progress') as SVGCircleElement;

//       if (timerElement && progressCircle) {
//         timerElement.textContent = `${this.remainingHours}:${this.remainingMinutes}:${this.remainingSeconds}`;
//         const offset = (440 * this.remainingTime) / this.totalTime;
//         progressCircle.style.strokeDashoffset = offset.toString();

//         if (this.remainingTime <= 10) {
//           progressCircle.classList.add('almost-done');
//         } else {
//           progressCircle.classList.remove('almost-done');
//         }
//       }
//     } else {
//       clearInterval(this.timerInterval); // Stop le timer
//       alert('⏰ Le temps est écoulé ! Calcul du score...');

//       // Lancer le calcul du score
//       this.onFinishTest();

//       // Attendre un peu avant la redirection (ex: 2 secondes pour s’assurer que le score est bien récupéré)
//       setTimeout(() => {
//         this.terminerTest();
//       }, 2000); 
//     }
//   }

//   onFinishTest() {
//     if (!this.token) {
//       this.errorMessage = "Erreur : Token manquant.";
//       return;
//     }

//     this.scoreService.calculateScore(this.testId, this.token).subscribe({
//       next: (response) => {
//         if (response.status === 'success') {
//           this.score = response.score;
//           console.log("✅ Score calculé :", this.score);

//           // Une fois le score récupéré, terminer le test proprement
//           this.terminerTest();
//         } else {
//           this.errorMessage = response.message;
//         }
//       },
//       error: (err) => {
//         this.errorMessage = err.error.message || 'Erreur lors du calcul du score';
//         console.error("❌ Erreur lors du calcul du score :", this.errorMessage);
//       }
//     });
//   }


//   // Fonction pour démarrer le timer
//   startTimer() {
//     this.timerInterval = setInterval(() => {
//       this.updateTimer();
//     }, 1000);
//   }
//   isLastQuestion(): boolean {
//     return this.currentQuestionIndex === this.questions.length - 1;
//   }

//   terminerTest() {
//     if (this.testTermine) return; // ✅ Évite double soumission
//     this.testTermine = true; // ✅ Bloque une autre tentative

//     console.log("🔍 developpeurId dans terminerTest():", this.developpeurId);
//     if (!this.developpeurId || !this.testId) {
//       console.error("Erreur : developpeurId ou testId est undefined !");
//       alert("Erreur : Identifiants manquants. Veuillez réessayer.");
//       return;
//     }

//     alert("Test terminé ! Vos réponses ont été envoyées.");
//     this.enregistrerReponse(this.questions[this.currentQuestionIndex].id, this.selectedOptionIds);

//     // ✅ Petite pause pour laisser finir le POST si besoin
//     setTimeout(() => {

//       this.router.navigate(['/test', this.testId, 'score', this.developpeurId]);
//       localStorage.removeItem('responses');
//     }, 500);
//   }

//   nextQuestion() {
//     console.log("isAnswered:", this.isAnswered);
//     if (!this.isAnswered) {
//       alert('Veuillez répondre à la question avant de passer à la suivante.');
//       return;
//     }

//     this.enregistrerReponse(this.questions[this.currentQuestionIndex].id, this.selectedOptionIds);

//     if (this.isLastQuestion()) {
//       // Si c'est la dernière question, soumettre le test
//       this.terminerTest();
//     } else if (this.currentQuestionIndex < this.questions.length - 1) {
//       this.currentQuestionIndex++;
//       this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex].id] || []; // ✅ Charger les réponses enregistrées
//     this.markAnswered(); 
// }
//   }



//   enregistrerReponse(questionId: number, selectedOptionIds: number[]) {
//     const token = localStorage.getItem('accessToken'); // Vérifier si le token existe

//     if (!token) {
//       alert('Vous devez être connecté pour soumettre vos réponses.');
//       this.router.navigate(['/signin']); // Rediriger vers la page de login si pas de token
//       return;
//     }

//     this.responses[questionId] = [...selectedOptionIds]; // Sauvegarder les réponses pour chaque question
//     localStorage.setItem('responses', JSON.stringify(this.responses));
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
//       'Content-Type': 'application/json' // Assurez-vous que le type est correct
//     });

//     this.http.post('http://localhost:8083/api/responses/submit', {
//       testId: this.testId,
//       questionId: questionId,
//       selectedOptionIds: selectedOptionIds,
//       developpeurId: this.developpeurId
//     }, { headers }).subscribe(
//       (response: any) => {
//         console.log('Réponse enregistrée', response);
//       },
//       (error) => {
//         console.error('Erreur lors de l\'enregistrement de la réponse :', error);
//       }
//     );

//   }
//   isChecked(questionId: number, optionId: number): boolean {
//     return this.responses[questionId]?.includes(optionId) ?? false;
//   }
//   // Soumettre le test
//   submitTest() {
//     console.log("Test soumis avec les réponses :", this.questions);
//     alert("Votre test a été soumis avec succès !");
//     clearInterval(this.timerInterval); // Stopper le timer
//   }

//   // Passer à la question précédente
//   previousQuestion() {
//     if (this.currentQuestionIndex > 0) {
//       this.currentQuestionIndex--;
//       this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex].id] || []; // ✅ Charger les choix précédents
//       this.markAnswered(); 
//     }
//   }



// // Marquer la question comme répondue
// markAnswered() {
//   const currentQuestion = this.questions[this.currentQuestionIndex];

//   if (!currentQuestion) return;

//   if (currentQuestion.type === 'QCM') {
//     this.isAnswered = this.selectedOptionIds.length > 0; // ✅ Vérifie s'il y a des réponses sélectionnées
//   } else if (currentQuestion.type === 'Text') {
//     const textAreas = document.querySelectorAll('textarea');
//     this.isAnswered = Array.from(textAreas).some(textarea => textarea.value.trim().length > 0);
//   }

//   console.log(`Question ${this.currentQuestionIndex + 1} - Réponse validée :`, this.isAnswered);
// }


// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'; // <-- Ajoute cette ligne
import { HttpClient, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';  // Assure-toi que c'est bien importé
import { Router } from '@angular/router'; // Importe le Router
import { AuthInterceptor } from '../../interceptors/auth.interceptor'; // Importer l'intercepteur
import { ScoreService } from '../../services/score.service';
import { CodeExecutionService } from '../../services/code-execution.service'; // Import du service d'exécution de code
import { AceEditorModule } from 'ngx-ace-editor-wrapper';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.css',

  imports: [CommonModule, FormsModule, AceEditorModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Utilisation de l'intercepteur
      multi: true
    },
    CodeExecutionService // <-- Ajouter ici

  ],
  standalone: true,
})

export class TestQuestionsComponent implements OnInit {
  Object = Object;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  testTitle: string = 'Test en Cours'; // Valeur par défaut
  testId!: number; // ID du test
  selectedOptionIds: number[] = [];  // Liste des options sélectionnées
  developpeurId!: number; // Valeur constante pour l'ID du développeur
  responses: { [key: number]: number[] } = {}; // Stocke les réponses par question
  testTermine: boolean = false;
  token!: string; // Ajoute cette ligne

  totalTime!: number; // Temps total en secondes
  remainingTime: number = this.totalTime; // Temps restant
  timerInterval: any; // Intervalle du timer
  isAnswered: boolean = false; // Ajout de la propriété `isAnswered`
  userCode: string = ''; // Stocke le code de l'utilisateur

  session: any; // Propriété pour stocker la session (si besoin)
  remainingHours: number = 0;
  remainingMinutes: number = 0;
  remainingSeconds: number = 0;
  score: number | null = null;
  errorMessage: string | null = null;
  selectedLanguage: string = 'javascript'; // Valeur par défaut
  form!: FormGroup;

  codeAnswers: { codeSnippet: string, language: string }[] = [];
  executionResults: string[] = [];
  codeAnswer: string = '';  // Réponse du développeur au code
  executionResult: string = '';  // Résultat de l'exécution du code
  themes: string[] = [
    'chrome',
    'monokai',
    'github',
    'twilight',
    'tomorrow_night',
    'solarized_light',
    'solarized_dark',
    'dracula'
  ];

  selectedTheme = 'chrome'; // Valeur par défaut
  editorOptions = {
    fontSize: 14,
    showLineNumbers: true,
    highlightActiveLine: true,
    tabSize: 2,
    useSoftTabs: true,
    wrap: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true
  };

  expectedOutput: string = '7'; // Résultat attendu, ici pour la somme de 3 et 4
  isCorrect: boolean | null = null;  // Indicateur de validité du code (correct ou incorrect)
  textAnswer: string = '';
  markedQuestions: number[] = []; // IDs des questions marquées
  Infinity: any;

  constructor(private scoreService: ScoreService, private fb: FormBuilder, private codeExecutionService: CodeExecutionService // <-- Ajouter ici
    , private testService: TestService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    // const token = localStorage.getItem('accessToken');
    this.token = localStorage.getItem('accessToken') ?? ''; // Si null, remplace par une chaîne vide
    if (!this.token) {
      alert('⚠ Vous devez être connecté pour accéder au test.');
      this.router.navigate(['/signin']);
      return; // Arrêter l'exécution
    }


    this.loadSavedResponses();
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex]?.id] || [];
    this.markAnswered();
    // const savedMarked = localStorage.getItem('markedQuestions');
    // if (savedMarked) {
    //   this.markedQuestions = JSON.parse(savedMarked);
    //   console.log("📌 Questions marquées chargées :", this.markedQuestions);
    // }
    // Dans ngOnInit()
    const savedMarked = localStorage.getItem(`markedQuestions_test_${this.testId}`);
    if (savedMarked) {
      this.markedQuestions = JSON.parse(savedMarked);
      console.log("📌 Questions marquées chargées :", this.markedQuestions);
    } else {
      this.markedQuestions = []; // Réinitialiser si pas de données pour ce test
    }
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
        this.codeAnswers = this.questions.map(q => ({
          codeSnippet: '',
          language: this.selectedLanguage
        }));
        this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex]?.id] || [];
        this.markAnswered();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des questions :', error);
      }
    });

    this.scoreService.getScore(this.testId, this.developpeurId, this.token)
  }


  loadSavedResponses() {
    // const savedResponses = localStorage.getItem('responses');
    const savedResponses = localStorage.getItem(`responses_test_${this.testId}`);

    if (savedResponses) {
      this.responses = JSON.parse(savedResponses); // Récupérer les réponses depuis le localStorage
    }
  }
  // toggleSelection(optionId: number, event: Event) {
  //   const isChecked = (event.target as HTMLInputElement).checked;

  //   if (isChecked) {
  //     this.selectedOptionIds.push(optionId);
  //   } else {
  //     this.selectedOptionIds = this.selectedOptionIds.filter(id => id !== optionId);
  //   }

  //   this.isAnswered = this.selectedOptionIds.length > 0; // ✅ Vérifie si au moins une option est sélectionnée

  //   console.log("Options sélectionnées :", this.selectedOptionIds);
  //   console.log("isAnswered:", this.isAnswered);
  // }

  toggleSelection(optionId: number): void {
    const index = this.selectedOptionIds.indexOf(optionId);
    if (index === -1) {
      this.selectedOptionIds.push(optionId); // Ajouter si pas encore sélectionné
    } else {
      this.selectedOptionIds.splice(index, 1); // Retirer si déjà sélectionné
    }

    this.isAnswered = this.selectedOptionIds.length > 0;
    this.saveProgressToLocalStorage(); // ✅ Sauvegarder la progression

    console.log("Options sélectionnées :", this.selectedOptionIds);
    console.log("isAnswered:", this.isAnswered);
  }
  isChecked(optionId: number): boolean {
    return this.selectedOptionIds.includes(optionId);
  }
  toggleMarkQuestion() {
    const currentQuestionId = this.questions[this.currentQuestionIndex].id;
    const index = this.markedQuestions.indexOf(currentQuestionId);

    if (index === -1) {
      this.markedQuestions.push(currentQuestionId);
    } else {
      this.markedQuestions.splice(index, 1);
    }
    // localStorage.setItem('markedQuestions', JSON.stringify(this.markedQuestions));

    localStorage.setItem(`markedQuestions_test_${this.testId}`, JSON.stringify(this.markedQuestions));
    console.log("📌 Questions marquées :", this.markedQuestions);
  }


  getTestDetails(): void {
    this.testService.getTestById(this.testId).subscribe(test => {
      this.testTitle = test.titre;

      if (test.duree != null) {
        this.totalTime = test.duree * 60; // Convertir les minutes en secondes

        const savedTime = localStorage.getItem(`remainingTime_test_${this.testId}`);

        if (savedTime !== null) {
          // ✅ Cas 1 : Un temps sauvegardé existe → reprendre à partir de ce temps
          this.remainingTime = parseInt(savedTime, 10);
        } else {
          // 🔁 Cas 2 : Pas de temps sauvegardé → lancer un nouveau timer
          this.remainingTime = this.totalTime;
        }

        this.startTimer();
      }
      else {
        // Cas où la durée est null → pas de timer
        // this.totalTime = 0;
        // this.remainingTime = 0;
        this.totalTime = -1; // Utiliser -1 pour représenter un temps illimité
        this.remainingTime = -1;
        this.remainingHours = -1;
        this.remainingMinutes = -1;
        this.remainingSeconds = -1;
      }
    });
  }



  updateTimer() {
    if (this.totalTime === -1) {
      const timerElement = document.querySelector('.timer-text');
      if (timerElement) {
        timerElement.textContent = '∞'; // Afficher le symbole infini
      }
      return;
    }
    if (this.remainingTime > 0) {
      this.remainingTime--;
      this.remainingHours = Math.floor(this.remainingTime / 3600);
      this.remainingMinutes = Math.floor((this.remainingTime % 3600) / 60);
      this.remainingSeconds = this.remainingTime % 60;
      localStorage.setItem(`remainingTime_test_${this.testId}`, this.remainingTime.toString());

      const timerElement = document.querySelector('.timer-text');
      const progressCircle = document.querySelector('.timer-progress') as SVGCircleElement;

      if (timerElement && progressCircle) {
        timerElement.textContent = `${this.remainingHours}:${this.remainingMinutes}:${this.remainingSeconds}`;
        const offset = (440 * this.remainingTime) / this.totalTime;
        progressCircle.style.strokeDashoffset = offset.toString();

        if (this.remainingTime <= 10) {
          progressCircle.classList.add('almost-done');
        } else {
          progressCircle.classList.remove('almost-done');
        }
      }
    } else {
      clearInterval(this.timerInterval); // Stop le timer
      alert('⏰ Le temps est écoulé ! Calcul du score...');

      // Lancer le calcul du score
      this.onFinishTest();

      // Attendre un peu avant la redirection (ex: 2 secondes pour s’assurer que le score est bien récupéré)
      setTimeout(() => {
        this.terminerTest();
      }, 1000);
    }
  }

  onFinishTest() {
    if (!this.token) {
      this.errorMessage = "Erreur : Token manquant.";
      return;
    }

    this.scoreService.calculateScore(this.testId, this.token).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.score = response.score;
          console.log("✅ Score calculé :", this.score);
          clearInterval(this.timerInterval); // Stop le timer

          // Une fois le score récupéré, terminer le test proprement
          setTimeout(() => {
            this.terminerTest();
          }, 3000);

        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur lors du calcul du score';
        console.error("❌ Erreur lors du calcul du score :", this.errorMessage);
      }
    });
    this.fetchScore();
    clearInterval(this.timerInterval); // Stop le timer

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
    
    // if (this.markedQuestions.length > 0) {
    //   const confirmFinish = confirm(`⚠ Vous avez ${this.markedQuestions.length} question(s) marquée(s). Voulez-vous vraiment terminer le test ?`);
    //   if (!confirmFinish) {
    //     return; // Annule la soumission
    //   }
    // }
    if (this.markedQuestions.length > 0) {
      const confirmFinish = confirm(`⚠ Vous avez ${this.markedQuestions.length} question(s) marquée(s) dans CE TEST. Voulez-vous vraiment terminer ?`);
      if (!confirmFinish) {
        return;
      }
    }
    if (this.testTermine) return; // ✅ Évite double soumission
    this.testTermine = true; // ✅ Bloque une autre tentative
    // 🟢 Supprimer le temps sauvegardé
    clearInterval(this.timerInterval); // Stopper le timer

    localStorage.removeItem(`remainingTime_test_${this.testId}`);
    console.log("🔍 developpeurId dans terminerTest():", this.developpeurId);
    if (!this.developpeurId || !this.testId) {
      console.error("Erreur : developpeurId ou testId est undefined !");
      alert("Erreur : Identifiants manquants. Veuillez réessayer.");
      return;
    }
    if (this.isLastQuestion()) {

      alert("Test terminé ! Vos réponses ont été envoyées.");
      this.enregistrerReponse(this.questions[this.currentQuestionIndex].id, this.selectedOptionIds);
      // this.fetchScore();
      this.ngOnInit();
    }
    else {
      if (Object.keys(this.responses).length === 0) {
      alert("⚠ Vous devez répondre à au moins une question avant de terminer le test.");
      return;
    }
      this.onFinishTest();
    }
    this.router.navigate(['/test', this.testId, 'score', this.developpeurId]);
    localStorage.removeItem(`markedQuestions_test_${this.testId}`);

    localStorage.removeItem('responses');


  }

  nextQuestion() {
    console.log("isAnswered:", this.isAnswered);
    // if (!this.isAnswered) {
    //   alert('Veuillez répondre à la question avant de passer à la suivante.');
    //   return;
    // }

    this.enregistrerReponse(this.questions[this.currentQuestionIndex].id, this.selectedOptionIds);


    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex].id] || []; // ✅ Charger les réponses enregistrées
      this.markAnswered();
    }
  }


  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
    // Réinitialise l’état si besoin
    this.textAnswer = '';
    this.codeAnswer = '';
    this.executionResult = '';
  }



  enregistrerReponse(questionId: number, selectedOptionIds: number[]) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Vous devez être connecté pour soumettre vos réponses.');
      this.router.navigate(['/signin']);
      return;
    }

    const currentQuestion = this.questions.find(q => q.id === questionId);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let body: any = {
      testId: this.testId,
      questionId: questionId,
      developpeurId: this.developpeurId
    };

    if (currentQuestion?.type === 'QCM') {
      this.responses[questionId] = [...selectedOptionIds];
      body.selectedOptionIds = selectedOptionIds;
    } else if (currentQuestion?.type === 'Text') {
      this.responses[questionId] = [+this.textAnswer];
      body.reponseLibre = this.textAnswer;
    } else if (currentQuestion?.type === 'Code') {
      this.responses[questionId] = [+this.codeAnswer];
      body.reponseLibre = this.codeAnswer;
      body.language = this.selectedLanguage; // facultatif si backend accepte
    }

    // localStorage.setItem('responses', JSON.stringify(this.responses));
    localStorage.setItem(`responses_test_${this.testId}`, JSON.stringify(this.responses));

    // Mettre à jour la progression
    this.saveProgressToLocalStorage();
    this.http.post('http://localhost:8083/api/responses/enregistrer', body, { headers }).subscribe(
      (response: any) => {
        console.log('Réponse enregistrée', response);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réponse :', error);
      }
    );
  }



  // isChecked(questionId: number, optionId: number): boolean {
  //   return this.responses[questionId]?.includes(optionId) ?? false;
  // }
  // Soumettre le test


  // Passer à la question précédente
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOptionIds = this.responses[this.questions[this.currentQuestionIndex].id] || []; // ✅ Charger les choix précédents
      this.markAnswered();
    }
  }

  onCodeChange() {
    // Vérifier si l'éditeur a du texte
    this.isAnswered = this.codeAnswer.trim().length > 0;
  }


  retourListeTests() {
    const confirmation = confirm("Vous êtes sûr de vouloir quitter ce test ?");

    if (confirmation) {
      clearInterval(this.timerInterval); // Stopper le timer

      // Redirection vers la liste des tests
      this.router.navigate(['/tests']); // Remplace le chemin par le vrai si besoin
    }
  }

  markAnswered(): void {
    if (this.questions[this.currentQuestionIndex]?.type === 'Code') {
      // Si la question est de type "Code", vérifier si du code a été écrit
      this.isAnswered = this.codeAnswer.trim().length > 0; // Vérifie si le code n'est pas vide
    } else if (this.questions[this.currentQuestionIndex]?.type === 'Text') {
      // Si la question est de type "Text", vérifier si une réponse a été saisie
      const textArea = document.querySelector('textarea');
      this.isAnswered = textArea ? textArea.value.trim().length > 0 : false;
    } else {
      // Pour les autres types de questions (QCM, etc.), vérifier si une option est sélectionnée
      this.isAnswered = this.selectedOptionIds.length > 0;
    }

    console.log("isAnswered:", this.isAnswered); // Pour débogage
  }

  getLanguageId(language: string): number {
    const languages: { [key: string]: number } = {
      python: 71,
      javascript: 63,
      java: 62,
      c: 50,
      cpp: 54,
      php: 68
    };
    return languages[language] || 63; // Par défaut : JavaScript
  }
  runCode() {
    if (!this.codeAnswer) {
      this.executionResult = "⚠️ Aucun code à exécuter.";
      return;
    }
    const language = this.questions[this.currentQuestionIndex]?.language;
    const languageId = this.getLanguageId(language); // Utilise le langage sélectionné

    this.codeExecutionService.executeCode(this.codeAnswer, languageId).subscribe(
      response => {
        this.executionResult = response.stdout || `❌ Erreur : ${response.stderr}`;
      },
      error => {
        this.executionResult = `🚫 Erreur API : ${error.message}`;
      }
    );
  }


  saveProgressToLocalStorage() {
    const progressList = JSON.parse(localStorage.getItem('test_progress_list') || '[]');

    // Compter seulement les réponses pour CE test
    const answeredQuestions = Object.keys(this.responses).length;

    const currentProgress = {
      testId: this.testId,
      totalQuestions: this.questions.length,
      answeredQuestions: answeredQuestions,
      lastUpdated: new Date().toISOString()
    };

    const existingIndex = progressList.findIndex((p: any) => p.testId === this.testId);
    if (existingIndex !== -1) {
      progressList[existingIndex] = currentProgress;
    } else {
      progressList.push(currentProgress);
    }

    localStorage.setItem('test_progress_list', JSON.stringify(progressList));
  }
  fetchScore() {
    this.scoreService.getScore(this.testId, this.developpeurId, this.token).subscribe({
      next: (data) => {
        if (data.status === 'success') {
          this.score = data.score;
          setTimeout(() => {
          }, 200); // petit délai pour l’effet
        } else {
          this.errorMessage = data.message;
        }
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la récupération du score.';
      },
    });
  }


}
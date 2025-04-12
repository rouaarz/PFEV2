// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common'; 
// import { QuestionService } from '../../../services/question-service.service';
// import { TestService } from '../../../services/test.service';
// import { Question } from '../../../models/Question';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-test-form',
//   templateUrl: './test-form.component.html',
//   styleUrls: ['./test-form.component.scss'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule] 
// })
// export class TestFormComponent implements OnInit {
//   testForm!: FormGroup;
//   token = localStorage.getItem('accessToken') ?? '';
//   testId: number | null = null;
//   questionsDisponibles: Question[] = []; 
//   assignedQuestions: Question[] = []; // ✅ Liste des questions assignées au test
//   questionsAssociees: Question[] = []; // ✅ Liste des questions déjà associées au test (correctement initialisée)

//   constructor(
//     private fb: FormBuilder,
//     private testService: TestService,
//     private questionService: QuestionService
//   ) {}

//   ngOnInit(): void {
//     this.testForm = this.fb.group({
//       titre: ['', Validators.required],
//       description: ['', Validators.required],
//       type: ['QCM', Validators.required],
//       duree: ['', Validators.required],
//       limiteTentatives: ['', Validators.required]
//     });

//     this.loadQuestions();
//   }

//   // ✅ Charger les questions existantes
//   loadQuestions() {
//     this.questionService.getAllQuestions().subscribe(
//       (data) => {
//         this.questionsDisponibles = data || [];
//       },
//       (error) => {
//         console.error('Erreur lors du chargement des questions', error);
//         this.questionsDisponibles = [];
//       }
//     );
//   }

//   // ✅ Créer le test et récupérer son ID
//   submitTest() {
//     if (this.testForm.valid) {
//       this.testService.createTest(this.testForm.value, this.token).subscribe(response => {
//         console.log('✅ Test créé avec succès :', response);
//         this.testId = response.id; // On stocke l'ID du test pour l'association des questions
//       }, error => console.error('❌ Erreur lors de la création du test', error));
//     }
//   }

//   assignQuestionToTest(question: Question) {
//     if (!this.testId) {
//       console.error('❌ Test non encore créé');
//       return;
//     }

//     // Créer l'objet au bon format
//     const payload = [
//       {
//         question: { id: question.id },
//         points: 10, // 👉 Tu peux adapter pour demander à l'utilisateur la valeur
//         ordre: this.questionsAssociees.length + 1
//       }
//     ];

//     console.log('Payload envoyé :', payload); // ✅ Pour vérifier

//     // Appel backend
//     this.testService.addQuestionsToTest(this.testId, payload, this.token).subscribe({
//       next: (response) => {
//         console.log('✅ Question assignée avec succès :', response);
//         this.questionsAssociees.push(question); // ✅ Mise à jour locale de la liste
//       },
//       error: (error) => {
//         console.error('❌ Erreur lors de l\'assignation de la question', error);
//       }
//     });
//   }

//   // ✅ Associer les questions sélectionnées au test
//   submitAssignedQuestions() {
//     if (this.testId && this.assignedQuestions.length > 0) {
//       const questionsIds = this.assignedQuestions.map(q => q.id);
//       this.testService.addQuestionsToTest(this.testId, questionsIds, this.token).subscribe({
//         next: (response) => {
//           console.log('✅ Questions assignées avec succès :', response);
//         },
//         error: (error) => {
//           console.error('❌ Erreur lors de l\'association des questions', error);
//         }
//       });
//     }
//   }

//   // ✅ Voir les détails d'une question (placeholder pour un modal ou un affichage plus complet)
//   detailQuestion(question: Question) {
//     console.log('🔍 Détail de la question :', question);
//     // Tu peux ouvrir un modal ici pour afficher les détails
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../../services/question-service.service';
import { TestService } from '../../../services/test.service';
import { Question } from '../../../models/Question';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TestFormComponent {
  testForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  token = localStorage.getItem('accessToken') ?? '';

  constructor(private fb: FormBuilder, private testService: TestService) {
    this.testForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      duree: [null, Validators.min(1)],
      type: ['', Validators.required],
      accesPublic: [false],
      limiteTentatives: [null],
      statut: ['BROUILLON', Validators.required],
      dateExpiration: [null],
    });
  }

  onSubmit() {
    if (this.testForm.valid) {
      //   submitTest() {
      //     if (this.testForm.valid) {
      //       this.testService.createTest(this.testForm.value, this.token).subscribe(response => {
      //         console.log('✅ Test créé avec succès :', response);
      //         this.testId = response.id; // On stocke l'ID du test pour l'association des questions
      //       }, error => console.error('❌ Erreur lors de la création du test', error));
      //     }
      //   }
      this.testService.createTest(this.testForm.value, this.token).subscribe(response => {
        console.log('✅ Test créé avec succès :', response);
              }, error => console.error('❌ Erreur lors de la création du test', error));
            }
          }
    }
  

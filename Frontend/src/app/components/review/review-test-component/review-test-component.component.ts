import { Component, OnInit } from '@angular/core';
import { DeveloppeurResponse } from '../../../models/DeveloppeurResponse ';
import { TestService } from '../../../services/test.service';
import { QuestionDisplayComponent } from '../question-display/question-display.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultGraphComponent } from '../result-graph/result-graph.component'
import { Input } from '@angular/core';

@Component({
  selector: 'app-review-test',
  templateUrl: './review-test-Component.component.html',
  styleUrls: ['./review-test-Component.component.css'],
  imports: [
    QuestionDisplayComponent, ResultGraphComponent,
    CommonModule, FormsModule],
  standalone: true,
})
// export class ReviewTestComponent implements OnInit {
//   reponses: DeveloppeurResponse[] = []; // Données des réponses
//   currentQuestionIndex: number = 0; // Index de la question en cours

//   constructor(private testService: TestService) { }

//   ngOnInit(): void {
//     const testId = 1; // Exemple d'ID du test (peut être dynamique)
//     const token = localStorage.getItem('accessToken') ?? ''; // Récupère le token depuis localStorage

//     // Récupérer les réponses depuis le backend
//     this.testService.getMesReponses(testId, token).subscribe({
//       next: (data) => {
//         this.reponses = data;
//         // console.log(this.reponses)
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des réponses:', err);
//       }
//     });
//   }

//   // Méthodes de navigation entre les questions
//   nextQuestion(): void {
//     if (this.currentQuestionIndex < this.reponses.length - 1) {
//       this.currentQuestionIndex++;
//     }
//   }

//   previousQuestion(): void {
//     if (this.currentQuestionIndex > 0) {
//       this.currentQuestionIndex--;
//     }
//   }

//   // Méthode pour vérifier si la question est en cours de consultation
//   isCurrentQuestion(index: number): boolean {
//     return this.currentQuestionIndex === index;
//   }
// }
export class ReviewTestComponent implements OnInit {
  reponses: DeveloppeurResponse[] = [];  // Données des réponses
  currentQuestionIndex: number = 0;      // Index de la question en cours
  // testId: number = 0;                    // ID du test
  // developpeurId: string = '';            // ID du développeur
  testDetails: any;
  @Input() testId: number = 0;
  @Input() developpeurId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.developpeurId = localStorage.getItem('developpeurId') ?? '';  // Récupérer l'ID du développeur depuis localStorage
    const token = localStorage.getItem('accessToken') ?? '';  // Récupère le token depuis localStorage
    this.testService.getTestDetails(this.testId).subscribe({
      next: (data) => {
        this.testDetails = data;
      }
    });
    // Récupérer les réponses depuis le backend
    this.testService.getMesReponses(this.testId, token).subscribe({
      next: (data) => {
        this.reponses = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réponses:', err);
      }
    });
  }

  // Méthodes de navigation entre les questions
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.reponses.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  // Méthode pour vérifier si la question est en cours de consultation
  isCurrentQuestion(index: number): boolean {
    return this.currentQuestionIndex === index;
  }

  // Calcul du nombre de réponses correctes
  getCorrectAnswersCount(): number {
    return this.reponses.filter(reponse => reponse.isCorrect).length;
  }

  // Nombre total de questions
  getTotalQuestionsCount(): number {
    return this.testDetails.nbQuestions;
  }

  // Méthode pour revenir au score
  scrollToScore(): void {
    if (this.developpeurId && this.testId) {
      this.router.navigate(['/test', this.testId, 'score', this.developpeurId]);
    } else {
      console.error('Test ID ou Développeur ID manquant');
    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ScoreService } from '../../services/score.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-score',
//   templateUrl: './score.component.html',
//   imports: [CommonModule],
//   styleUrl: './score.component.css',
//   standalone: true,
// })
// export class ScoreComponent implements OnInit {
//   testId!: number;
//   developpeurId!: number;
//   token!: string;
//   score: number | null = null;
//   errorMessage: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private scoreService: ScoreService
//   ) {}

//   ngOnInit() {
//     this.testId = Number(this.route.snapshot.paramMap.get('testId'));
//     this.developpeurId = Number(this.route.snapshot.paramMap.get('developpeurId'));
//     this.token = localStorage.getItem('accessToken') || '';
  
//     console.log("🛠 testId:", this.testId);
//     console.log("🛠 developpeurId:", this.developpeurId);
//     console.log("🛠 token:", this.token);
  
//     if (!this.testId || !this.developpeurId || !this.token) {
//       this.errorMessage = 'Informations manquantes !';
//       return;
//     }
  
//     this.fetchScore();
//   }
  

//   fetchScore() {
//     this.scoreService.getScore(this.testId, this.developpeurId, this.token).subscribe({
//       next: (data) => {
//         if (data.status === 'success') {
//           this.score = data.score;
//         } else {
//           this.errorMessage = data.message;
//         }
//       },
//       error: () => {
//         this.errorMessage = 'Erreur lors de la récupération du score.';
//       },
//     });
//   }
//   calculateScore(testId: number) {
//     this.scoreService.calculateScore(testId, this.token).subscribe({
//       next: (response) => {
//         if (response.status === 'success') {
//           this.score = response.score;
//         } else {
//           this.errorMessage = response.message;
//         }
//       },
//       error: (err) => {
//         this.errorMessage = err.error.message || 'Erreur lors du calcul du score';
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { TestService } from '../../services/test.service';  // Assurez-vous d'avoir le service TestService importé
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
    imports: [CommonModule],

  standalone: true,
})
export class ScoreComponent implements OnInit {
  testId!: number;
  developpeurId!: number;
  token!: string;
  score: number | null = null;
  errorMessage: string | null = null;

  testName: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService,
    private testService: TestService  // Injecter TestService
  ) {}

  ngOnInit() {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.developpeurId = Number(this.route.snapshot.paramMap.get('developpeurId'));
    this.token = localStorage.getItem('accessToken') || '';
  
    if (!this.testId || !this.developpeurId || !this.token) {
      this.errorMessage = 'Informations manquantes !';
      return;
    }
  
    this.fetchTestDetails();
    this.fetchScore();
  }

  // Récupérer les détails du test
  fetchTestDetails() {
    this.testService.getTestDetails(this.testId).subscribe({
      next: (data) => {
        this.testName = data.titre;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la récupération des détails du test.';
      }
    });
  }

  // Récupérer le score
  fetchScore() {
    this.scoreService.getScore(this.testId, this.developpeurId, this.token).subscribe({
      next: (data) => {
        if (data.status === 'success') {
          this.score = data.score;
        } else {
          this.errorMessage = data.message;
        }
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la récupération du score.';
      },
    });
  }

  // Repasser le test
  repasserTest() {
    this.router.navigateByUrl(`/test/${this.testId}/questions`);
  }

  // Voir l'analyse complète
  voirAnalyse() {
    this.router.navigate([`/test/${this.testId}/analyse`]);
  }
  partagerScore() {
    const message = `J'ai réussi le test ${this.testName} avec un score de ${this.score}% !`;
    
    // Ouvre la fenêtre de partage via l'API Web Share (si supportée par le navigateur)
    if (navigator.share) {
      navigator.share({
        title: 'Mon score de test',
        text: message,
        url: window.location.href,
      }).catch((error) => console.log('Erreur de partage :', error));
    } else {
      // Si l'API de partage n'est pas supportée, afficher une simple alerte
      alert('Partager ce score : ' + message);
    }
  }
  
}

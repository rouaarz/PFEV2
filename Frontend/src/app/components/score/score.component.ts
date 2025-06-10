
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ScoreService } from '../../services/score.service';
// import { TestService } from '../../services/test.service';  // Assurez-vous d'avoir le service TestService importé
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-score',
//   templateUrl: './score.component.html',
//   styleUrls: ['./score.component.css'],
//   imports: [CommonModule],

//   standalone: true,
// })
// export class ScoreComponent implements OnInit {
//   testId!: number;
//   developpeurId!: number;
//   token!: string;
//   score: number | null = null;
//   errorMessage: string | null = null;

//   testName: string = '';
//   animatedScore: number = 0;
//   testNiveau: string = '';
//   testTechnologie: string = '';
//   suggestedTest: any = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private scoreService: ScoreService,
//     private testService: TestService  // Injecter TestService
//   ) { }

//   ngOnInit() {

//     this.testId = Number(this.route.snapshot.paramMap.get('testId'));
//     this.developpeurId = Number(this.route.snapshot.paramMap.get('developpeurId'));
//     this.token = localStorage.getItem('accessToken') || '';

//     if (!this.testId || !this.developpeurId || !this.token) {
//       this.errorMessage = 'Informations manquantes !';
//       return;
//     }

//     this.fetchTestDetails();
//     this.fetchScore();

//   }

//   // Récupérer les détails du test
//   fetchTestDetails() {
//     this.testService.getTestDetails(this.testId).subscribe({
//       next: (data) => {
//         this.testName = data.titre;
//       },
//       error: () => {
//         this.errorMessage = 'Erreur lors de la récupération des détails du test.';
//       }
//     });
//   }

//   // Récupérer le score
//   fetchScore() {
//     this.scoreService.getScore(this.testId, this.developpeurId, this.token).subscribe({
//       next: (data) => {
//         if (data.status === 'success') {
//           this.score = data.score;
//           setTimeout(() => {
//             this.animatedScore = this.score!;
//           }, 200); // petit délai pour l’effet
//         } else {
//           this.errorMessage = data.message;
//         }
//       },
//       error: () => {
//         this.errorMessage = 'Erreur lors de la récupération du score.';
//       },
//     });
//   }

//   // Repasser le test
//   repasserTest() {
//     this.router.navigateByUrl(`/test/${this.testId}/questions`);
//   }

//   // Voir l'analyse complète
//   voirAnalyse() {
//     this.router.navigate([`/test/${this.testId}/analyse`]);
//   }
//   partagerScore() {
//     const message = `J'ai réussi le test ${this.testName} avec un score de ${this.score}% !`;

//     // Ouvre la fenêtre de partage via l'API Web Share (si supportée par le navigateur)
//     if (navigator.share) {
//       navigator.share({
//         title: 'Mon score de test',
//         text: message,
//         url: window.location.href,
//       }).catch((error) => console.log('Erreur de partage :', error));
//     } else {
//       // Si l'API de partage n'est pas supportée, afficher une simple alerte
//       alert('Partager ce score : ' + message);
//     }
//   }
//   // Dans score.component.ts
//   analyserResultat() {
//     this.router.navigate([`/review-test`, this.testId]);
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { TestService } from '../../services/test.service';
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
  animatedScore: number = 0;
  testNiveau: string = '';
  testTechnologie: string = '';
  suggestedTest: any = null;
  email: string = '';
  technologies: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService,
    private testService: TestService
  ) {}

  ngOnInit() {

    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.developpeurId = Number(this.route.snapshot.paramMap.get('developpeurId'));
    this.token = localStorage.getItem('accessToken') || '';

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.email = user.email || '';
    }

    if (!this.testId || !this.developpeurId || !this.token || !this.email) {
      this.errorMessage = 'Informations manquantes !';
      return;
    }

    this.fetchTestDetails();
    this.fetchScore();
  }

  fetchTestDetails() {
    this.testService.getTestDetails(this.testId).subscribe({
      next: (data) => {
        this.testName = data.titre;
        this.testNiveau = data.niveauDifficulte;
        this.testTechnologie = data.technologies?.[0] || '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la récupération des détails du test.';
      }
    });
  }

  fetchScore() {
    if (!localStorage.getItem('hasRefreshed')) {
    localStorage.setItem('hasRefreshed', 'true');
    window.location.reload();
    return;
  }
  localStorage.removeItem('hasRefreshed');
  this.scoreService.getScore(this.testId, this.developpeurId, this.token).subscribe({
    next: (data) => {
      if (data.status === 'success') {
        this.score = data.score;
        setTimeout(() => {
          this.animatedScore = this.score!;
        }, 200);

        // Si le score est >= 65, on passe à l'étape suivante
        const isNext = this.score! >= 65;

        // Récupérer aussi les détails nécessaires pour la suggestion
        this.testService.getTestDetails(this.testId).subscribe({
          next: (test) => {
            this.testNiveau = test.niveauDifficulte;
            this.testTechnologie = test.technologies?.[0]!; // ou gérer plusieurs
              const emailDev = this.email || '';

            // Appel du service de suggestion
            this.testService.getTestsSuggeres(emailDev, this.testTechnologie, this.testNiveau, isNext).subscribe({
              next: (suggestions) => {
                this.suggestedTest = suggestions?.[0] || null;
              },
              error: () => {
                console.error("Erreur lors de la récupération du test suggéré");
              }
            });
          },
          error: () => {
            console.error("Erreur lors de la récupération des détails du test");
          }
        });

      } else {
        this.errorMessage = data.message;
      }
    },
    error: () => {
      this.errorMessage = 'Erreur lors de la récupération du score.';
    }
  });
}



  repasserTest() {
    this.router.navigateByUrl(`/test/${this.testId}/questions`);
  }

  voirAnalyse() {
    this.router.navigate([`/test/${this.testId}/analyse`]);
  }

  analyserResultat() {
    this.router.navigate([`/review-test`, this.testId]);
  }

  partagerScore() {
    const message = `J'ai réussi le test ${this.testName} avec un score de ${this.score}% !`;
    if (navigator.share) {
      navigator.share({
        title: 'Mon score de test',
        text: message,
        url: window.location.href
      }).catch((error) => console.log('Erreur de partage :', error));
    } else {
      alert('Partager ce score : ' + message);
    }
  }
goToQuestions(testId: number): void {
    this.router.navigateByUrl(`/test/${testId}/questions`);
  }
  passerSuggestion() {
    if (this.suggestedTest) {
      this.router.navigateByUrl(`/test/${this.suggestedTest.id}/questions`);
    }
  }
}

// import { Component,Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; // <-- Ajoute cette ligne
// import { ScoreService } from '../../services/score.service';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';  // Assure-toi que c'est bien importé

// @Component({
//   selector: 'app-score',
//   templateUrl: './score.component.html',
//   styleUrl: './score.component.css',
//   imports: [CommonModule, FormsModule // Ajoute ceci

//   ],
//   standalone: true,
// })
// export class ScoreComponent implements OnInit {
//   testId!: number;  // ID du test
//   developpeurId: number=1;  // ID du développeur
//   score: number | null = null;  // Score du développeur
//   errorMessage: string | null = null;  // Message d'erreur

//   constructor(
//     private route: ActivatedRoute, 
//     private scoreService: ScoreService
//   ) {}

//   ngOnInit(): void {
//     // Récupérer les paramètres de l'URL (testId et developpeurId)
//     this.testId = +this.route.snapshot.paramMap.get('testId')!;  // Convertir en number
//     this.developpeurId = +this.route.snapshot.paramMap.get('developpeurId')!;  // Convertir en number

//     this.getScore();
//   }

//   getScore(): void {
//     this.scoreService.getScore(this.testId, this.developpeurId).subscribe({
//       next: (response) => {
//         this.score = response.score;
//       },
//       error: (error) => {
//         this.errorMessage = error.error.message || "Erreur lors de la récupération du score.";
//       }
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ScoreService } from '../../services/score.service';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-score',
//   templateUrl: './score.component.html',
//   styleUrl: './score.component.css',
//   imports: [CommonModule, FormsModule],
//   standalone: true,
// })
// export class ScoreComponent implements OnInit {
//   testId!: number;  // ID du test
//   developpeurId: number = 0;  // ID du développeur (initialisé à 0)
//   score: number | null = null;  // Score du développeur
//   errorMessage: string | null = null;  // Message d'erreur

//   constructor(
//     private route: ActivatedRoute, 
//     private scoreService: ScoreService
//   ) {}

//   ngOnInit(): void {
//     // Récupérer les paramètres de l'URL (testId)
//     this.testId = +this.route.snapshot.paramMap.get('testId')!;  // Convertir en number

//     // Récupérer l'ID du développeur depuis localStorage
//     const developpeurId = localStorage.getItem('developpeurId');
//     if (!developpeurId) {
//       console.error("❌ developpeurId est undefined !");
//     } else {
//       console.log("✅ developpeurId récupéré :", developpeurId);
//     }

//     this.getScore();
//   }

//   getScore(): void {
//     this.scoreService.getScore(this.testId, this.developpeurId).subscribe({
//       next: (response) => {
//         this.score = response.score;
//       },
//       error: (error) => {
//         this.errorMessage = error.error.message || "Erreur lors de la récupération du score.";
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  imports: [CommonModule],
  styleUrl: './score.component.css',
  standalone: true,
})
export class ScoreComponent implements OnInit {
  testId!: number;
  developpeurId!: number;
  token!: string;
  score: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.developpeurId = Number(this.route.snapshot.paramMap.get('developpeurId'));
    this.token = localStorage.getItem('accessToken') || '';
  
    console.log("🛠 testId:", this.testId);
    console.log("🛠 developpeurId:", this.developpeurId);
    console.log("🛠 token:", this.token);
  
    if (!this.testId || !this.developpeurId || !this.token) {
      this.errorMessage = 'Informations manquantes !';
      return;
    }
  
    this.fetchScore();
  }
  

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
  calculateScore(testId: number) {
    this.scoreService.calculateScore(testId, this.token).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.score = response.score;
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur lors du calcul du score';
      }
    });
  }
}

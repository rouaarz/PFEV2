/*import { Component, OnInit } from '@angular/core';
import { DeveloppeurDashboardDTO } from '../models/developpeur-dashboard-dto';
import { DeveloppeurService } from '../services/developpeur.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-dashboard-developpeur',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard-developpeur.component.html',
  styleUrls: ['./dashboard-developpeur.component.scss']
})
export class DashboardDeveloppeurComponent implements OnInit {
  dashboardData?: DeveloppeurDashboardDTO;
  totalTestsByLevel: { [level: string]: number } = {};
  constructor(private dashboardService: DeveloppeurService,private testService: TestService) {}


 

  ngOnInit(): void {
    const id = localStorage.getItem('developpeurId');

    if (id) {
      this.dashboardService.getDashboardByDeveloppeurId(+id).subscribe({
        next: (data) => {
          this.dashboardData = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement du dashboard', err);
        }
      });
    } else {
      console.warn('Aucun ID trouvé dans le localStorage');
    }
    this.loadTestCounts();
  }
  loadTestCounts() {
   const levels = ['Facile', 'Intermédiaire', 'Difficile'];

    levels.forEach(level => {
      this.testService.getTestCountByNiveau(level).subscribe({
        next: (count) => {
          this.totalTestsByLevel[level] = count;
          console.log(`Nombre total de tests pour ${level}:`, count);
        },
        error: (err) => {
          console.error(`Erreur lors de la récupération du nombre de tests pour ${level}`, err);
          this.totalTestsByLevel[level] = 0;
        }
      });
    });
  }

  getProgressColor(score: number): string {
    if (score>= 70) return '#38a169'; // Vert
    if (score >= 40) return '#d69e2e'; // Orange
    return '#e53e3e'; // Rouge
  }

  getStrokeDasharray(value: number): string {
    return `${value}, 100`;
  }

getProgressPercentageByLevel(level: string): number {
  const tests = this.getTestsByLevel(level);
  const total = tests.length;
  const passed = tests.filter(test => test.score >= 65).length;
  if (total === 0) return 0;
  return (passed / total) * 100;
}


  getTestCountByScore(min: number, max: number): number {
    if (!this.dashboardData?.tests) return 0;
    return this.dashboardData.tests.filter(test => test.score >= min && test.score <= max).length;
  }

  getAverageScoreByRange(min: number, max: number): number {
    const relevantTests = this.dashboardData?.tests?.filter(test => test.score >= min && test.score <= max) || [];
    if (relevantTests.length === 0) return 0;
    const total = relevantTests.reduce((sum, test) => sum + test.score, 0);
    return total / relevantTests.length;
  }

 

  getSuccessCount(): number {
    return this.dashboardData?.tests?.filter(test => test.score >= 65).length || 0;
  }

  getSuccessRate(): number {
    const totalTests = this.dashboardData?.tests?.length || 1;
    return (this.getSuccessCount() / totalTests) * 100;
  }

  isCertifUnlocked(): boolean {
    return this.getSuccessRate() >= 65;
  }

  // Version unifiée des méthodes par niveau (utilise 'niveau' ou 'niveauDifficulte' selon ta structure)

  getSuccessCountByLevel(level: string): number {
    return this.getTestsByLevel(level).filter(test => test.score >= 65).length;
  }

  getSuccessRateByLevel(level: string): number {
    const tests = this.getTestsByLevel(level);
    if (tests.length === 0) return 0;
    const passed = tests.filter(t => t.score >= 65);
    return (passed.length / tests.length) * 100;
  }
  /*private getTestsByLevel(level: string) {
  return this.dashboardData?.tests?.filter(test => test.niveauDifficulte === level) || [];
}


  isLevelCompleted(niveauDifficulte : string): boolean {
    const tests = this.getTestsByLevel(niveauDifficulte );
    if (tests.length === 0) return false;
    return tests.every(test => test.score >= 65);
  }


// Récupère les tests par niveau (niveau doit être 'FACILE', 'INTERMEDIAIRE', ou 'DIFFICILE')
getTestsByLevel(level: string): any[] {
  const tests = this.dashboardData?.tests?.filter(
    test => test.niveauDifficulte.toUpperCase() === level.toUpperCase()
  ) || [];

  console.log(`Niveau: ${level} | Nombre de tests: ${tests.length}`);
  return tests;
}

getTotalTestsByLevel(level: string): number {
  const tests = this.getTestsByLevel(level);
  const total = tests.length;

  console.log(`Nombre total de tests pour ${level} :`, total); // 👈 LOG ICI
  return total;
}



// Vérifie si un seul niveau est complété (tous ses tests ont score >= 65)
isLevelCompleted(level: string): boolean {
  const tests = this.getTestsByLevel(level);
  if (tests.length === 0) return false;
  return tests.every(test => test.score >= 65);
}

// ✅ Vérifie si tous les niveaux sont complétés (FACILE, INTERMEDIAIRE, DIFFICILE)

isAllLevelsCompleted(): boolean {
   const levels = ['Facile', 'Intermédiaire', 'Difficile'];
  const allCompleted = levels.every(level => this.isLevelCompleted(level));
  console.log(`Tous les niveaux complétés ? ${allCompleted}`);
  return allCompleted;
}

}
*/

import { Component, OnInit } from '@angular/core';
import { DeveloppeurDashboardDTO } from '../models/developpeur-dashboard-dto';
import { DeveloppeurService } from '../services/developpeur.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TestService } from '../services/test.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-dashboard-developpeur',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink,
    NavbarComponent
],
  templateUrl: './dashboard-developpeur.component.html',
  styleUrls: ['./dashboard-developpeur.component.scss']
})
export class DashboardDeveloppeurComponent implements OnInit {
obtenirCertificat() {
throw new Error('Method not implemented.');
}

  dashboardData?: DeveloppeurDashboardDTO;

   user!: User ;
  userPhotoUrl: string | null = null;


  // Stocke le nombre total de tests par niveau récupéré via API
  totalTestsByLevel: { [level: string]: number } = {};
  
  // Niveaux reconnus (attention à la casse utilisée dans le backend)
    levels = ['FACILE', 'Intermédiaire', 'DIFFICILE'];
    level: string = '';

  constructor(
    private dashboardService: DeveloppeurService,
    private testService: TestService,
    private userService: UserService,
     private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('developpeurId');

    if (id) {
      this.dashboardService.getDashboardByDeveloppeurId(+id).subscribe({
        next: (data) => {
          this.dashboardData = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement du dashboard', err);
        }
      });
    } else {
      console.warn('Aucun ID trouvé dans le localStorage');
    }

    this.loadTestCounts();
    this.level = this.route.snapshot.paramMap.get('level') || '';
    console.log('Niveau sélectionné:', this.level);
     const developpeurId = localStorage.getItem('developpeurId');
  if (developpeurId) {
    const id = +developpeurId;

    // Récupération des données utilisateur
    this.userService.getUserById(id).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du développeur", err);
      }
    });

    // Récupération de la photo
    this.userService.getUserPhoto().subscribe({
      next: (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.userPhotoUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la photo du développeur', err);
      }
    });
  }}


  loadTestCounts(): void {
    this.levels.forEach(level => {
      this.testService.getTestCountByNiveau(level).subscribe({
        next: (count) => {
          this.totalTestsByLevel[level] = count;
          console.log(`Nombre total de tests pour ${level}:`, count);
        },
        error: (err) => {
          console.error(`Erreur lors de la récupération du nombre de tests pour ${level}`, err);
          this.totalTestsByLevel[level] = 0;
        }
      });
    });
  }

  // --- Méthodes de calcul et affichage ---

  // Retourne les tests filtrés par niveau
  getTestsByLevel(level: string): any[] {
    const tests = this.dashboardData?.tests?.filter(
      test => test.niveauDifficulte.toUpperCase() === level.toUpperCase()
    ) || [];

    console.log(`Niveau: ${level} | Nombre de tests: ${tests.length}`);
    return tests;
  }

  // Nombre total de tests pour un niveau (depuis dashboardData)


  // Nombre de tests réussis (score >= 65) par niveau
  getSuccessCountByLevel(level: string): number {
    return this.getTestsByLevel(level).filter(test => test.score >= 65).length;
  }

  // Pourcentage de réussite par niveau
  getSuccessRateByLevel(level: string): number {
    const tests = this.getTestsByLevel(level);
    if (tests.length === 0) return 0;
    const passed = tests.filter(t => t.score >= 65);
    return (passed.length / tests.length) * 100;
  }

  // Vérifie si tous les tests d'un niveau sont réussis

  // Exemple d’une méthode pour la couleur de progression selon score
  getProgressColor(score: number): string {
    if (score >= 70) return '#38a169'; // vert
    if (score >= 40) return '#d69e2e'; // orange
    return '#e53e3e'; // rouge
  }
  isSelectedLevelCompleted(): boolean {
  if (!this.level) return false;
  return this.isLevelCompleted(this.level);
}

getProgressColorByLevel(level: string): string {
  const successCount = this.getSuccessCountByLevel(level);
  const totalCount = this.getTotalTestsByLevel(level);

  if (totalCount === 0) return '#e53e3e'; // rouge si aucun test

  const score = (successCount / totalCount) * 100;

  if (score >= 70) return '#38a169'; // vert
  if (score >= 40) return '#d69e2e'; // orange
  return '#e53e3e'; // rouge
}

  // Pour usage dans le template pour une barre de progression SVG ou CSS
  getStrokeDasharray(value: number): string {
    return `${value}, 100`;
  }
  getTestCountByScore(min: number, max: number): number {
    if (!this.dashboardData?.tests) return 0;
    return this.dashboardData.tests.filter(test => test.score >= min && test.score <= max).length;
  }
  
  getTotalTestsByLevel(level: string): number {
    return this.totalTestsByLevel[level] || 0;
  }

  isLevelCompleted(level: string): boolean {
    return this.getSuccessCountByLevel(level) === this.getTotalTestsByLevel(level) && this.getTotalTestsByLevel(level) > 0;
  }

  isAllLevelsCompleted(): boolean {
    return this.levels.every(level => this.isLevelCompleted(level));
  }
}

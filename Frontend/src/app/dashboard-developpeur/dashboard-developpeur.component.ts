import { Component, OnInit } from '@angular/core';
import { DeveloppeurDashboardDTO } from '../models/developpeur-dashboard-dto';
import { DeveloppeurService } from '../services/developpeur.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TestStatDTO } from '../models/test-stat-dto';

@Component({
  selector: 'app-dashboard-developpeur',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './dashboard-developpeur.component.html',
  styleUrl: './dashboard-developpeur.component.scss' 
})
export class DashboardDeveloppeurComponent implements OnInit {
  getProgressColor(score: number): string {
    if (score >= 70) return '#38a169'; // Vert pour les bons scores
    if (score >= 40) return '#d69e2e'; // Orange pour les scores moyens
    return '#e53e3e'; // Rouge pour les faibles scores
  }
  dashboardData?: DeveloppeurDashboardDTO;

  constructor(private dashboardService: DeveloppeurService) {}

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
  }
  getStrokeDasharray(value: number): string {
  return `${value}, 100`;
}



getCertificationClass(score: number): string {
  if (score >= 70) return 'easy';
  if (score >= 40) return 'intermediate';
  return 'hard';
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


getCertificationLevel(score: number): string {
  if (score >= 70) return 'Facile';
  if (score >= 40) return 'Intermédiaire';
  return 'Difficile';
}
}

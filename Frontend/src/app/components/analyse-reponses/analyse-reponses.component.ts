
import { Component, OnInit } from '@angular/core';
import { DeveloppeurResponse } from '../../models/DeveloppeurResponse ';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analyse-reponses',
  templateUrl: './analyse-reponses.component.html',
  styleUrls: ['./analyse-reponses.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AnalyseReponsesComponent implements OnInit {
  reponses: DeveloppeurResponse[] = [];

  token!: string | null;

  constructor(private TestService: TestService) { }

  ngOnInit(): void {
    console.log('🔍 Composant AnalyseReponsesComponent initialisé');

    const testId = 1;
    console.log('📌 ID du test récupéré :', testId);

    this.token = localStorage.getItem('accessToken') ?? '';
    console.log('🔐 Token récupéré depuis localStorage :', this.token);

    console.log('📡 Envoi de la requête pour récupérer les réponses du développeur...');
    
    this.TestService.getMesReponses(testId, this.token).subscribe({
      next: (data) => {
        console.log('✅ Réponses récupérées avec succès :', data);
        this.reponses = data;
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération des réponses :', err);
      }
    });
  }
  isOptionSelected(option: any, selectedAnswerOptions: any[]): boolean {
    return selectedAnswerOptions.some(selectedOption => selectedOption.id === option.id);
  }
}

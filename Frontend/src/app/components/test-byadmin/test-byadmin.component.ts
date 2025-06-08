import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-test-byadmin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './test-byadmin.component.html',
  styleUrl: './test-byadmin.component.css'
})
export class TestBYAdminComponent implements OnInit {
  tests: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchText: string = '';
  facileCount: number = 0;
  intermediaireCount: number = 0;
  difficileCount: number = 0;
  selectedDifficulte: string | null = null;
  token!: string;
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;

  // Types et technologies
  types: string[] = [];
  selectedTypes: string[] = [];
  typeCounts: { [key: string]: number } = {};
  visibleTypeCount = 4;
  showAllTypes = false;

  technologies: string[] = [];
  technologyCounts: { [key: string]: number } = {};

  selectedTechnologies: string[] = [];
  visibleTechnologyCount = 5;
  showAllTechnologies = false;
  scores: { [testId: number]: number } = {};

  constructor(private testService: TestService, private scoreService: ScoreService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken') || '';
    this.fetchTests();
  }

  fetchTests(): void {
    this.testService.getAvailableTests().subscribe({
      next: (data) => {
        this.tests = data;

        // Statistiques par niveau
        this.facileCount = this.tests.filter(t => t.niveauDifficulte === 'Facile').length;
        this.intermediaireCount = this.tests.filter(t => t.niveauDifficulte === 'Intermédiaire').length;
        this.difficileCount = this.tests.filter(t => t.niveauDifficulte === 'Difficile').length;

        this.generateTypeCounts();
        this.generateTypeCounts();
        this.generateTechnologyCounts(); // <= Ajout ici

        this.loading = false;
        this.loadQuestionsForTests();
      },
      error: () => {
        this.error = 'Erreur lors du chargement des tests.';
        this.loading = false;
      }
    });
  }

  generateTypeCounts(): void {
    const counts: { [key: string]: number } = {};
    this.tests.forEach(test => {
      const type = test.type?.toLowerCase();
      if (type) {
        counts[type] = (counts[type] || 0) + 1;
      }
    });

    this.typeCounts = counts;
    this.types = Object.keys(counts);
  }
  generateTechnologyCounts(): void {
    const counts: { [key: string]: number } = {};

    this.tests.forEach(test => {
      const techList: string[] = test.technologies || [];
      techList.forEach(tech => {
        const techLower = tech.toLowerCase();
        counts[techLower] = (counts[techLower] || 0) + 1;
      });
    });

    this.technologyCounts = counts;
    this.technologies = Object.keys(counts);
  }

 loadQuestionsForTests(): void {
    this.tests.forEach(test => {
      this.testService.getQuestionsForTest(test.id).subscribe({
        next: (questions) => {
          test.questionsCount = questions.length;

          // 🔍 Vérifie la progression locale
          const progress = this.getTestProgress(test.id);
          if (progress) {
            const percentage = this.getProgressPercentage(progress.answeredQuestions, progress.totalQuestions);

            // ✅ Si progression à 100%, récupère le score
            if (percentage === 100) {
              const developpeurId = parseInt(localStorage.getItem('developpeurId') || '0'); // adapte ça
              if (developpeurId && this.token) {
                this.scoreService.getScore(test.id, developpeurId, this.token).subscribe({
                  next: (scoreData) => {
                    this.scores[test.id] = Number(scoreData.score.toFixed(2));
                  },
                  error: () => {
                    console.error(`Erreur de score pour le test ${test.id}`);
                  }
                });
              }
            }
          }
        },
        error: () => test.questionsCount = 0
      });
    });
  }

  getIcon(type: string): string {
    switch ((type || '').toLowerCase()) {
      case 'qcm': return 'fas fa-list-ul';
      case 'code': return 'fas fa-code';
      case 'mixte': return 'fas fa-layer-group';
      case 'react': return 'fab fa-react';
      case 'php': return 'fab fa-php';
      case 'java': return 'fab fa-java';
      case 'rh': return 'fas fa-user-tie';
      case 'html': return 'fab fa-html5';
      case 'technique': return 'fas fa-tools';
      case 'python': return 'fab fa-python';
      case 'angular': return 'fab fa-angular';
      case 'spring': return 'fas fa-leaf';
      case 'node': return 'fab fa-node-js';
      case 'vue': return 'fab fa-vuejs';
      case 'docker': return 'fab fa-docker';
      case 'mysql': return 'fas fa-database';
      case 'mongodb': return 'fas fa-leaf';
      case 'c#': return 'fas fa-code'; // Pas d’icône spécifique
      case 'c++': return 'fas fa-code';
      case 'ruby': return 'fas fa-gem';
      case 'kotlin': return 'fas fa-mobile-alt';
      case 'swift': return 'fas fa-apple';
      case 'css': return 'fab fa-css3-alt';
      case 'javascript': return 'fab fa-js';
      case 'typescript': return 'fab fa-js'; // pas d’icône spécifique dans FontAwesome
      default: return 'fas fa-laptop-code';
    }
  }

  goToQuestions(testId: number) {
    this.router.navigateByUrl(`/test/${testId}/questions`);
  }

  filterByDifficulte(niveau: string | null): void {
    this.selectedDifficulte = niveau;
  }

  toggleTypeSelection(type: string) {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
  }

  toggleTechnologySelection(tech: string) {
    const index = this.selectedTechnologies.indexOf(tech);
    if (index === -1) {
      this.selectedTechnologies.push(tech);
    } else {
      this.selectedTechnologies.splice(index, 1);
    }
  }

  get visibleTypes() {
    return this.showAllTypes ? this.types : this.types.slice(0, this.visibleTypeCount);
  }

  toggleShowAllTypes() {
    this.showAllTypes = !this.showAllTypes;
  }

  get visibleTechnologies() {
    return this.showAllTechnologies ? this.technologies : this.technologies.slice(0, this.visibleTechnologyCount);
  }

  toggleShowAllTechnologies() {
    this.showAllTechnologies = !this.showAllTechnologies;
  }

  get filteredTests() {
    let filtered = this.tests;

    if (this.selectedDifficulte) {
      filtered = filtered.filter(t => t.niveauDifficulte === this.selectedDifficulte);
    }

    if (this.selectedTypes.length > 0) {
      filtered = filtered.filter(t =>
        this.selectedTypes
          .map(type => type.toLowerCase())
          .includes(t.type?.toLowerCase())
      );
    }

    if (this.selectedTechnologies.length > 0) {
      filtered = filtered.filter(t =>
        t.technologies?.some((tech: string) =>
          this.selectedTechnologies
            .map(selTech => selTech.toLowerCase())
            .includes(tech.toLowerCase())
        )
      );
    }


    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      filtered = filtered.filter(test =>
        test.titre?.toLowerCase().includes(lowerSearch) ||
        test.description?.toLowerCase().includes(lowerSearch) ||
        test.type?.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }

  searchTests() {
    console.log('Recherche :', this.searchText);
  }
getTestProgress(testId: number): { answeredQuestions: number, totalQuestions: number } | null {
    const progressList = JSON.parse(localStorage.getItem('test_progress_list') || '[]');
    const progress = progressList.find((p: any) => p.testId === testId);

    if (!progress) return null;

    // Vérifier aussi les réponses enregistrées pour ce test
    const testResponses = JSON.parse(localStorage.getItem(`responses_test_${testId}`) || '{}');
    const actualAnswered = Object.keys(testResponses).length;

    return {
      answeredQuestions: actualAnswered,
      totalQuestions: progress.totalQuestions
    };
  }
  getProgressPercentage(answered: number, total: number): number {
    if (!total) return 0;
    return Math.round((answered / total) * 100);
  }


}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Ajout de Router
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

  
@Component({
  selector: 'app-test-byadmin',
  imports: [CommonModule,FormsModule],

  standalone: true, 
    templateUrl: './test-byadmin.component.html',
  styleUrl: './test-byadmin.component.css'
})
export class TestBYAdminComponent {
  tests: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchText: string = '';
  facileCount: number = 0;
  intermediaireCount: number = 0;
  difficileCount: number = 0;
  selectedDifficulte: string | null = null;
  token!: string;

  types = [
    'algo', 'mixte', 'react', 'php', 'java', 'rh', 'technique','html'
  ];
  selectedTypes: string[] = [];
  visibleTypeCount = 4;
showAllTypes = false;
typeCounts: { [key: string]: number } = {};

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

get visibleTypes() {
  return this.showAllTypes ? this.types : this.types.slice(0, this.visibleTypeCount);
}

toggleShowAllTypes() {
  this.showAllTypes = !this.showAllTypes;
}


  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken') || '';
    console.log(this.token)
    this.fetchTests();

  }
  getIcon(type: string): string {
    switch ((type || '').toLowerCase()) {
      case 'qcm': return 'fas fa-list-ul';
      case 'algo': return 'fas fa-code';
      case 'mixte': return 'fas fa-layer-group';
      case 'react': return 'fab fa-react';
      case 'php': return 'fab fa-php';
      case 'java': return 'fab fa-java';
      case 'rh': return 'fas fa-user-tie';   
      case 'html': return 'fab fa-html5';

      case 'technique': return 'fas fa-tools';     



      default: return 'fas fa-file-alt';
    }
  }
  
  fetchTests(): void {
    this.testService.getAvailableTests().subscribe({
      
      next: (data) => {

        this.tests = data;
        this.facileCount = this.tests.filter(t => t.niveauDifficulte === 'Facile').length;
        this.intermediaireCount = this.tests.filter(t => t.niveauDifficulte === 'Intermédiaire').length;
        this.difficileCount = this.tests.filter(t => t.niveauDifficulte === 'Difficile').length;
         this.generateTypeCounts(); // 👈 Ajout ici

        this.loading = false;
        this.loadQuestionsForTests();

      },
      error: (err) => {
        this.error = 'Error loading tests';
        this.loading = false;
      }
    });
  }
  loadQuestionsForTests(): void {
    this.tests.forEach((test) => {
      this.testService.getQuestionsForTest(test.id).subscribe({
        next: (questions) => {
          test.questionsCount = questions.length; // Add a new property to hold the count of questions
        },
        error: (err) => {
          console.error('Error loading questions for test', test.id, err);
          test.questionsCount = 0; // Set to 0 if there's an error
        },
      });
    });
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
  
  get filteredTests() {
    let filtered = this.tests;
  
    if (this.selectedDifficulte) {
      filtered = filtered.filter(t => t.niveauDifficulte === this.selectedDifficulte);
    }
  
    if (this.selectedTypes.length > 0) {
      filtered = filtered.filter(t => this.selectedTypes.includes(t.type));
    }
    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      filtered = filtered.filter(test =>
        test.titre?.toLowerCase().includes(lowerSearch) ||
        test.description?.toLowerCase().includes(lowerSearch) ||
        test.type?.toLowerCase().includes(lowerSearch) // 👈 Ajout ici !
      );
    }
    
    return filtered;
  }
  searchTests() {
    console.log('Recherche :', this.searchText);
    // Appliquer le filtre sur le texte de recherche dans le titre ou la description
    
  }
}

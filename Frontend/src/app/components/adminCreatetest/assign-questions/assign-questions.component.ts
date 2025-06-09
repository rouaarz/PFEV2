
// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { QuestionService } from '../../../services/question-service.service';
// import { TestService } from '../../../services/test.service';
// import { Question } from '../../../models/Question';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-assign-questions',
//   templateUrl: './assign-questions.component.html',
//   styleUrls: ['./assign-questions.component.css'],
//   imports: [CommonModule, FormsModule],
//   standalone: true,
// })
// export class AssignQuestionsComponent implements OnInit {
//   @Input() testId: number | null = null;  // Récupérer l'ID du test
//   questions: Question[] = [];
//   filteredQuestions: Question[] = []; // Questions filtrées
//   searchTerm: string = ''; // Term de recherche
//   lastOrdre: number = 0; // Dernier ordre utilisé pour l'incrémentation
//   @Output() questionsFinalized = new EventEmitter<void>(); // Émet l'événement quand les questions sont finalisées
//   @Output() questionsAssignedEvent = new EventEmitter<void>(); // ✅ pour notifier au parent

//   constructor(private questionService: QuestionService, private testService: TestService) {}
//   questionsAssigned: boolean = false; // Valeur par défaut, à changer lorsque les questions sont assignées

//   ngOnInit(): void {
//     this.questionService.getAllQuestions().subscribe((data) => {
//       this.questions = data;
//       this.filteredQuestions = data; // Initialiser avec toutes les questions
//     });
//   }
//   onQuestionsAssigned() {
//     this.questionsAssigned = true; // Mettre à jour la valeur pour signaler que les questions sont assignées
//   }
//   finalizeQuestions() {
//     if (this.testId !== null) {
//       this.questionsFinalized.emit(); // Émet l'événement pour notifier le parent
//     }
//   }
//   // Fonction de filtrage basée sur la recherche
//   filterQuestions() {
//     if (this.searchTerm.trim() === '') {
//       this.filteredQuestions = this.questions; // Afficher toutes les questions si rien n'est recherché
//     } else {
//       this.filteredQuestions = this.questions.filter((question) =>
//         question.enonce.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
//         question.type.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//     }
//   }

//   assignQuestionToTest(question: Question) {
//     // Vérification des points et ordre
//     if (!question.selectedPoints || question.selectedPoints <= 0) {
//       alert('Veuillez définir un nombre de points pour cette question avant de l\'assigner.');
//       return;
//     }
//     if (!question.selectedOrdre) {
//       question.selectedOrdre = this.lastOrdre + 1;
//       this.lastOrdre = question.selectedOrdre;
//     }
  
//     // Ajouter la question au test
//     if (this.testId !== null) {
//       const token = localStorage.getItem('accessToken') || '';
//       const testQuestion = {
//         question: { id: question.id },
//         points: question.selectedPoints,
//         ordre: question.selectedOrdre
//       };
  
//       this.testService.addQuestionsToTest(this.testId, [testQuestion], token).subscribe(
//         (response) => {
//           console.log('Questions ajoutées au test avec succès', response);
//           question.isAssigned = true;
  
//           // ✅ Vérifier s'il y a AU MOINS UNE question assignée pour activer le bouton
//           this.questionsAssigned = this.questions.some(q => q.isAssigned);
  
//           // ✅ Notifier le parent si besoin (optionnel si utilisé)
//           this.questionsAssignedEvent.emit();
  
//           alert('La question a été assignée au test avec succès!');
//         },
//         (error) => {
//           console.error('Erreur lors de l\'ajout des questions', error);
//         }
//       );
//     }}
// }
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question-service.service';
import { TestService } from '../../../services/test.service';
import { Question } from '../../../models/Question';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-questions',
  templateUrl: './assign-questions.component.html',
  styleUrls: ['./assign-questions.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AssignQuestionsComponent implements OnInit {
  getTypeIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'QCM': '☑️',
      'Multiple Response': '☑️☑️',
      'True/False': '✓✗',
      'Fill in the Blank': '✍️',
      'Matching/Ordering': '⇅',
      'Numeric': '123',
      'Short Answer': '✏️',
      'Essay': '📝',
      'File Upload': '📤',
      'Text': '✏️',
      'Code': '</>'
    };
    return icons[type] || '?';
  }
  @Input() testId: number | null = null;  // Récupérer l'ID du test
  questions: Question[] = [];
  filteredQuestions: Question[] = []; // Questions filtrées
  searchTerm: string = ''; // Term de recherche
  lastOrdre: number = 0; // Dernier ordre utilisé pour l'incrémentation
  @Output() questionsFinalized = new EventEmitter<void>(); // Émet l'événement quand les questions sont finalisées
  @Output() questionsAssignedEvent = new EventEmitter<void>(); // ✅ pour notifier au parent
totalPoints: any;

  constructor(private questionService: QuestionService,private route: ActivatedRoute, private testService: TestService) {}
questionsAssigned: boolean = false; 
// Ajoutez ces propriétés à votre classe
currentPage: number = 1;
itemsPerPage: number = 3; // Nombre de questions par page

get totalPages(): number {
  return Math.ceil(this.filteredQuestions.length / this.itemsPerPage);
}

getPaginatedQuestions(): Question[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredQuestions.slice(startIndex, endIndex);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}
closeQuestions() {
  this.showQuestions = false;  // Masque la liste des questions
  // Optionnel : Réinitialiser les filtres si nécessaire
  // this.resetFilters();
}
// Méthode pour générer les numéros de page à afficher
getPageNumbers(): number[] {
  const pages = [];
  const maxVisiblePages = 3; // Nombre maximum de pages visibles
  
  let startPage = Math.max(1, this.currentPage - 1);
  let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
  
  // Ajuster si on est près de la fin
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
}

// Méthode pour aller à une page spécifique
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}
// Modifiez la méthode filterQuestions() pour réinitialiser la pagination

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Test ID:', this.testId);

    this.questionService.getAllQuestions().subscribe((data) => {
      this.questions = data;
      this.filteredQuestions = data; // Initialiser avec toutes les questions

      // Charger les questions assignées pour ce test
      if (this.testId !== null) {
        this.testService.getQuestionsForTest(this.testId).subscribe((assignedQuestions) => {
          console.log('Questions assignées pour ce test:', assignedQuestions); // Vérifie la réponse de l'API
          this.questions.forEach(question => {
            const assignedQuestion = assignedQuestions.find(q => q.id === question.id);
            if (assignedQuestion) {
              question.isAssigned = true;
              question.selectedPoints = assignedQuestion.points;
              question.selectedOrdre = assignedQuestion.ordre;
            }
          });
        });
      }
    });
  }

  onQuestionsAssigned() {
    this.questionsAssigned = true; // Mettre à jour la valeur pour signaler que les questions sont assignées
  }

  finalizeQuestions() {
    if (this.testId !== null) {
      this.questionsFinalized.emit(); // Émet l'événement pour notifier le parent
    }
  }


assignQuestionToTest(question: Question) {
  // Vérification des points et ordre
  if (!question.selectedPoints || question.selectedPoints <= 0) {
    alert('Veuillez définir un nombre de points pour cette question avant de l\'assigner.');
    return;
  }

  // Vérification que l'ordre n'est pas déjà utilisé par une autre question assignée
  const isOrderAlreadyUsed = this.questions.some(q => 
    q.isAssigned && 
    q.selectedOrdre === question.selectedOrdre && 
    q.id !== question.id
  );

  if (isOrderAlreadyUsed) {
    alert('Cet ordre est déjà utilisé par une autre question. Veuillez choisir un ordre différent.');
    return;
  }

  if (!question.selectedOrdre) {
    question.selectedOrdre = this.lastOrdre + 1;
    this.lastOrdre = question.selectedOrdre;
  }

  // Vérification si la question a déjà été assignée
  if (question.isAssigned) {
    // Si les points ou l'ordre ont changé, réactiver le bouton "Assigner"
    if (question.selectedPoints !== question.previousPoints || question.selectedOrdre !== question.previousOrdre) {
      question.isAssigned = false; // Autoriser la réassignation
    } else {
      return; // Ne rien faire si la question n'a pas changé
    }
  }

  // Ajouter ou réassigner la question au test
  if (this.testId !== null) {
    const token = localStorage.getItem('accessToken') || '';
    const testQuestion = {
      question: { id: question.id },
      points: question.selectedPoints,
      ordre: question.selectedOrdre
    };

    this.testService.addQuestionsToTest(this.testId, [testQuestion], token).subscribe(
      (response) => {
        console.log('Questions ajoutées au test avec succès', response);
        question.isAssigned = true;

        // Mettre à jour les points et l'ordre précédents pour comparer lors de futures modifications
        question.previousPoints = question.selectedPoints;
        question.previousOrdre = question.selectedOrdre;

        // Notifier le parent si besoin
        this.questionsAssignedEvent.emit();

        alert('La question a été assignée ou réassignée au test avec succès!');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout des questions', error);
      }
    );
  }
}
  // Dans votre composant
// Dans votre composant
questionTypes = [
   { value: 'QCM', label: 'Choix multiple' },
  { value: 'Text', label: 'Réponse texte' },
  { value: 'Code', label: 'Réponse code' }
];

questionLevels = [
  { value: 'FACILE', label: 'FACILE' },
  { value: 'MOYEN', label: 'MOYEN' },
  { value: 'DIFFICILE', label: 'DIFFICILE' }
];

activeTypeFilter: string | null = null;
activeLevelFilter: string | null = null;

getQuestionNumber(index: number): number {
  return (this.currentPage - 1) * this.itemsPerPage + index + 1;
}

filterByType(type: string) {
  this.activeTypeFilter = type;
  this.filterQuestions();
}

filterByLevel(level: string) {
  this.activeLevelFilter = level;
  this.filterQuestions();
}

clearTypeFilter() {
  this.activeTypeFilter = null;
  this.filterQuestions();
}

clearLevelFilter() {
  this.activeLevelFilter = null;
  this.filterQuestions();
}

clearAllFilters() {
  this.activeTypeFilter = null;
  this.activeLevelFilter = null;
  this.searchTerm = '';
  this.filterQuestions();
}

/*filterQuestions() {
  let filtered = this.questions;
  
  // Filtre par type
  if (this.activeTypeFilter) {
    filtered = filtered.filter(q => q.type === this.activeTypeFilter);
  }
  
  // Filtre par niveau
  if (this.activeLevelFilter) {
    filtered = filtered.filter(q => q.niveau === this.activeLevelFilter);
  }
  
  // Filtre par texte
  if (this.searchTerm.trim() !== '') {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(q => 
      q.enonce.toLowerCase().includes(term) || 
      (q.type && q.type.toLowerCase().includes(term)) ||
      (q.niveau && q.niveau.toLowerCase().includes(term))
    );
  }
  
  this.filteredQuestions = filtered;
  this.currentPage = 1;
}*/
// Ajoutez ces propriétés

showQuestions: boolean = false;

applyFilters() {
  this.showQuestions = true;
  this.filterQuestions();
}

resetFilters() {
  this.activeTypeFilter = null;
  this.activeLevelFilter = null;
  this.searchTerm = '';
  this.showQuestions = false;
  this.filteredQuestions = [];
}

// Modifiez la méthode filterQuestions
filterQuestions() {
  if (!this.showQuestions) return;

  let filtered = this.questions;
  
  // Filtre par type
  if (this.activeTypeFilter) {
    filtered = filtered.filter(q => q.type === this.activeTypeFilter);
  }
  
  // Filtre par niveau
  if (this.activeLevelFilter) {
    filtered = filtered.filter(q => q.niveau === this.activeLevelFilter);
  }
  
  // Filtre par texte
  if (this.searchTerm.trim() !== '') {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(q => 
      q.enonce.toLowerCase().includes(term) || 
      (q.type && q.type.toLowerCase().includes(term)) ||
      (q.niveau && q.niveau.toLowerCase().includes(term))
    );
  }
  
  this.filteredQuestions = filtered;
  this.currentPage = 1;
}}

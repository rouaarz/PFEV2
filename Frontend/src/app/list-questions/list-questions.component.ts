import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Question } from '../models/Question';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../services/question-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-questions',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule,NgxPaginationModule],
  standalone: true,
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'] // Correction ici
})
export class ListQuestionsComponent implements OnInit, OnDestroy {

  @Input() questions: Question[] = [];
  @Output() editQuestion = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<number>();
  private subscriptions = new Subscription();
  pagedQuestions: any;
  currentPage = 1; 
  filteredQuestions: Question[] = []; // Liste filtrée
  searchTerm: string = ''; // Terme de recherche

  constructor(private questionService: QuestionService, private router: Router) {} // Correction ici

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.subscriptions.add(
      this.questionService.getAllQuestions().subscribe(data => {
        this.questions = data;
        this.filteredQuestions = [...data]; 
      })
    );
  }

  onEdit(question: Question) {
    if (!question.id) {
      console.error('L\'ID de la question est manquant');
      return;
    }
    this.router.navigate(['/admin/edit-question', question.id]); // Correction ici
  }

  
  onDeleteQuestion(id: number) {
    // Demande de confirmation avant la suppression
    const isConfirmed = confirm('Êtes-vous sûr de vouloir supprimer cette question ?');
    
    if (!isConfirmed) {
      return; // Si l'utilisateur annule, on arrête la suppression
    }
  
    console.log('Suppression reçue avec ID :', id);
    
    // Appel à la méthode du service pour supprimer la question de la base de données
    this.questionService.deleteQuestion(id).subscribe({
      next: () => {
        // Si la suppression côté serveur est réussie, on supprime la question de la liste locale
        this.questions = this.questions.filter(q => q.id !== id);
        this.filteredQuestions = this.filteredQuestions.filter(q => q.id !== id);
  
        // Optionnel: Ajuster la pagination si nécessaire
        if (this.filteredQuestions.length === 0 && this.currentPage > 1) {
          this.currentPage -= 1; // Passer à la page précédente si la page actuelle est vide
        }
        alert('Question supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        alert('Une erreur est survenue lors de la suppression');
      }
    });
  }
    
  
  searchQuestions(){
    if (!this.searchTerm.trim()) {
      this.filteredQuestions = [...this.questions]; // Réinitialiser la liste
      return;
    }
    this.filteredQuestions = this.questions.filter(q =>
      q.enonce?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      q.type?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      q.niveau?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Pour éviter les fuites mémoire
  }
  goToAddQuestion() {
    this.router.navigate(['/admin/Question']); // Remplacez par le bon chemin
  }

}

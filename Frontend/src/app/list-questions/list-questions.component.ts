import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Question } from '../models/Question';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../services/question-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-questions',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule,NgxPaginationModule],
  standalone: true,
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'] // Correction ici
})
export class ListQuestionsComponent implements OnInit, OnDestroy {
  token = localStorage.getItem('accessToken') ?? '';

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
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement la question.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
        backdrop: false

  }).then((result) => {
    if (result.isConfirmed) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => {
          // Mise à jour des listes locales
          this.questions = this.questions.filter(q => q.id !== id);
          this.filteredQuestions = this.filteredQuestions.filter(q => q.id !== id);

          // Ajuster la pagination si nécessaire
          if (this.filteredQuestions.length === 0 && this.currentPage > 1) {
            this.currentPage -= 1;
          }

          Swal.fire({
            title: 'Supprimée !',
            text: 'La question a été supprimée avec succès.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
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

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
  styleUrls: ['./list-questions.component.css'] // Correction ici
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
    this.router.navigate(['/edit-question', question.id]); // Correction ici
  }

  onDeleteQuestion(id: number) {
    console.log('Suppression reçue avec ID :', id);
    this.questions = this.questions.filter(q => q.id !== id);
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

}

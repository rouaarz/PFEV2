import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { QuestionService} from '../../../services/question-service.service';
import { CommonModule } from '@angular/common'; // ✅ Ajouter ça

@Component({
  selector: 'app-question-pool',
  templateUrl: './question-pool.component.html',
  styleUrls: ['./question-pool.component.scss'],
    standalone: true, // ⚠️ Important : si standalone component
    imports: [CommonModule],
})
export class QuestionPoolComponent implements OnInit {

  questions: any[] = [];
  @Output() questionSelected = new EventEmitter<any>();

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (res) => this.questions = res,
      error: (err) => console.error('Erreur de chargement questions', err)
    });
  }

  selectQuestion(question: any) {
    this.questionSelected.emit(question); // renvoyer la question sélectionnée
  }
}


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../models/Question';
import { QuestionService } from '../services/question-service.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';
import { CodeExecutionService } from '../services/code-execution.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  standalone: true,
  styleUrls: ['./question.component.css'],
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, AceEditorModule]
})
export class QuestionComponent implements OnInit, OnDestroy {
  token!: string;
  questionForm: FormGroup;
  questions: Question[] = [];
  executionResults: string[] = [];
  editingQuestion: Question | null = null;
  editorOptions = { theme: 'monokai', mode: 'javascript' };
  private subscriptions = new Subscription();




  constructor(private fb: FormBuilder, private questionService: QuestionService, private codeService: CodeExecutionService, private router: Router) {
    this.questionForm = this.fb.group({
      enonce: ['', Validators.required],
      type: ['QCM', Validators.required],
      niveau: ['FACILE', Validators.required],
      technologie: ['', Validators.required],       // ✅ nouveau champ
      tempsEstime: [0, [Validators.required, Validators.min(1)]],  // ✅ nouveau champ
      language: ['javascript', Validators.required],
      answerOptions: this.fb.array([]),
      codeAnswers: this.fb.array([])
    });

  }


  ngOnInit() {
    this.token = localStorage.getItem('accessToken') || '';
    console.log("🛠 token:", this.token);

    this.loadQuestions();
    this.questionForm.get('type')?.valueChanges.subscribe(() => this.updateQuestionFields());
  }


  get answerOptions(): FormArray {
    return this.questionForm.get('answerOptions') as FormArray;
  }

  get codeAnswers(): FormArray {
    return this.questionForm.get('codeAnswers') as FormArray;
  }

  get isQCM(): boolean {
    return this.questionForm.get('type')?.value === 'QCM';
  }

  get isCode(): boolean {
    return this.questionForm.get('type')?.value === 'Code';
  }

  updateQuestionFields() {
    this.answerOptions.clear();
    this.codeAnswers.clear();

    if (this.isQCM) {
      this.addAnswerOption();
    } else if (this.isCode) {
      this.addCodeAnswer();
    }
  }

  addAnswerOption() {
    this.answerOptions.push(this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    }));
  }

  removeAnswerOption(index: number) {
    this.answerOptions.removeAt(index);
  }

  addCodeAnswer() {
    this.codeAnswers.push(this.fb.group({
      codeSnippet: ['', Validators.required],
      language: ['javascript', Validators.required]
    }));
  }



  removeCodeAnswer(index: number) {
    this.codeAnswers.removeAt(index);
  }

  validateQCM(): boolean {
    return !this.isQCM || this.answerOptions.controls.some(option => option.get('isCorrect')?.value);
  }
  editQuestion(question: Question) {
    this.editingQuestion = question;
    this.questionForm.patchValue(question);
    this.answerOptions.clear();
    this.codeAnswers.clear();

    if (question.type === 'QCM') {
      question.answerOptions?.forEach(option => {
        this.answerOptions.push(this.fb.group(option));
      });
    } else if (question.type === 'Code') {
      question.codeAnswers?.forEach((answer: { codeSnippet: string; language?: string }) => {
        this.codeAnswers.push(this.fb.group({
          codeSnippet: answer.codeSnippet,
          language: answer.language || 'javascript'
        }));
      });

    }
  }

  deleteQuestion(id: number) {
    this.subscriptions.add(
      this.questionService.deleteQuestion(id).subscribe(() => {
        this.loadQuestions();
      })
    );
  }


  // submitQuestion() {
  //   // if (!this.validateQCM()) {
  //   //   alert('Vérifiez que tous les champs sont bien remplis et choisir une reponse correcte !');
  //   //   return;
  //   // }
  //   if (!this.validateQCM()) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Erreur',
  //       text: 'Vérifiez que tous les champs sont bien remplis et choisir une réponse correcte !'
  //     });
  //     return;
  //   }

  //   const questionData: Question = this.questionForm.value;
  //   if (questionData.type === 'Code' && this.codeAnswers.length > 0) {
  //     questionData.language = this.codeAnswers.at(0).get('language')?.value;
  //   }

  //   if (this.editingQuestion) {
  //     this.subscriptions.add(
  //       this.questionService.updateQuestion(this.editingQuestion.id, questionData).subscribe(() => {
  //         this.resetForm();
  //         this.loadQuestions();
  //         this.router.navigate(['/admin/List-Question']);
  //       })
  //     );
  //   } else {
  //     this.subscriptions.add(
  //       this.questionService.addQuestion(questionData, this.token).subscribe(() => {
  //         this.resetForm();
  //         this.loadQuestions();
  //         this.router.navigate(['/admin/List-Question']);
  //       })
  //     );
  //   }
  // }
submitQuestion() {
  if (!this.validateQCM()) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Vérifiez que tous les champs sont bien remplis et choisir une réponse correcte !'
    });
    return;
  }

  const questionData: Question = this.questionForm.value;
  if (questionData.type === 'Code' && this.codeAnswers.length > 0) {
    questionData.language = this.codeAnswers.at(0).get('language')?.value;
  }

  if (this.editingQuestion) {
    this.subscriptions.add(
      this.questionService.updateQuestion(this.editingQuestion.id, questionData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Question mise à jour avec succès !',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.resetForm();
          this.loadQuestions();
          this.router.navigate(['/admin/List-Question']);
        });
      })
    );
  } else {
    this.subscriptions.add(
      this.questionService.addQuestion(questionData, this.token).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Question ajoutée avec succès !',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.resetForm();
          this.loadQuestions();
          this.router.navigate(['/admin/List-Question']);
        });
      })
    );
  }
}


  resetForm() {
    this.questionForm.reset({
      enonce: '',
      type: 'QCM',
      niveau: 'FACILE',
      technologie: '',
      tempsEstime: 1,
      language: 'javascript',
      answerOptions: [],
      codeAnswers: []
    });

    this.answerOptions.clear();
    this.codeAnswers.clear();
    this.editingQuestion = null;
    this.router.navigate(['/admin/List-Question']);

  }


  loadQuestions() {
    this.subscriptions.add(
      this.questionService.getAllQuestions().subscribe(data => {
        this.questions = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getLanguageId(language: string): number {
    const languages: { [key: string]: number } = {
      python: 71,
      javascript: 63,
      java: 62,
      c: 50,
      cpp: 54,
      php: 68
    };
    return languages[language] || 63; // Par défaut : JavaScript
  }

  runCode(index: number) {
    const codeData = this.codeAnswers.at(index)?.value;
    const code = codeData.codeSnippet;
    const language = codeData.language;

    if (!code) {
      this.executionResults[index] = "⚠️ Aucun code à exécuter.";
      return;
    }

    const languageId = this.getLanguageId(language);
    this.codeService.executeCode(code, languageId).subscribe(
      response => {
        this.executionResults[index] = response.stdout || `❌ Erreur : ${response.stderr}`;
      },
      error => {
        this.executionResults[index] = `🚫 Erreur API : ${error.message}`;
      }
    );
  }

}

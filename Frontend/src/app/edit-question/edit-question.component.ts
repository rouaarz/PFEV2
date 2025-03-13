import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question-service.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CodeExecutionService } from '../services/code-execution.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, AceEditorModule,NgxPaginationModule]
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  questionForm: FormGroup;
  executionResults: string[] = [];
  editorOptions = { theme: 'monokai', mode: 'javascript' };
  private subscriptions = new Subscription();
  questionId: number | null = null; // Stocke l'ID récupéré

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private codeService: CodeExecutionService,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      id: [null],
      enonce: ['', Validators.required],
      type: ['QCM', Validators.required],
      niveau: ['FACILE', Validators.required],
      answerOptions: this.fb.array([]),
      codeAnswers: this.fb.array([])
    });
  }

  ngOnInit() {
    // Récupération de l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.questionId = +id;
        this.loadQuestion(this.questionId);
      }
    });

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

  /**
   * Charge la question depuis l'API et remplit le formulaire.
   */
  loadQuestion(id: number) {
    this.subscriptions.add(
      this.questionService.getQuestionById(id).subscribe(question => {
        if (question) {
          this.questionForm.patchValue({
            id: question.id,
            enonce: question.enonce,
            type: question.type,
            niveau: question.niveau
          });

          // Remplir les réponses selon le type
          this.answerOptions.clear();
          this.codeAnswers.clear();

          if (question.type === 'QCM' && question.answerOptions) {
            question.answerOptions.forEach((option: any) => {
              this.answerOptions.push(this.fb.group({
                text: [option.text, Validators.required],
                isCorrect: [option.isCorrect]
              }));
            });
          } else if (question.type === 'Code' && question.codeAnswers) {
            question.codeAnswers.forEach((answer: any) => {
              this.codeAnswers.push(this.fb.group({
                codeSnippet: [answer.codeSnippet, Validators.required],
                language: [answer.language, Validators.required]
              }));
            });
          }
        }
      })
    );
  }

  /**
   * Soumet les modifications d'une question
   */
  submitQuestion() {
    if (this.questionForm.invalid) {
      alert('Vérifiez que tous les champs sont bien remplis !');
      return;
    }

    const questionData = this.questionForm.value;

    if (!questionData.id) {
      alert("ID de la question manquant !");
      return;
    }

    this.subscriptions.add(
      this.questionService.updateQuestion(questionData.id, questionData).subscribe(() => {
        alert('Question mise à jour avec succès !');
      })
    );
  }

  cancelEdit() {
    this.questionForm.reset({
      id: this.questionId,
      enonce: '',
      type: 'QCM',
      niveau: 'FACILE',
      answerOptions: [],
      codeAnswers: []
    });
    if (this.questionId) {
      this.loadQuestion(this.questionId);
    }
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
    return languages[language] || 63;
  }

  runCode(index: number) {
    const codeControl = this.codeAnswers.at(index);
    if (!codeControl) {
      console.error(`Index ${index} invalide pour l'exécution du code.`);
      return;
    }

    const codeData = codeControl.value;
    const code = codeData.codeSnippet;
    const language = codeData.language;

    if (!code) {
      this.executionResults[index] = "⚠️ Aucun code à exécuter.";
      return;
    }

    const languageId = this.getLanguageId(language);

    this.subscriptions.add(
      this.codeService.executeCode(code, languageId).subscribe(
        response => {
          this.executionResults[index] = response.stdout || `❌ Erreur : ${response.stderr}`;
        },
        error => {
          this.executionResults[index] = `🚫 Erreur API : ${error.message}`;
        }
      )
    );
  }
}

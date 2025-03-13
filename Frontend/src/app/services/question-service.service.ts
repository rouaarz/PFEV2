
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:8083/api/questions';

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/all`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  addQuestion(question: Question, token: string): Observable<Question> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // return this.http.post<Question>(`${this.apiUrl}/add`, question);
    return this.http.post<Question>(`${this.apiUrl}/add`, question, {
      headers: headers,
      responseType: 'json'  // Ajoute cette ligne pour t'assurer que la réponse est traitée comme du JSON
    });
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/update/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  searchQuestions(term: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/search?query=${term}`);
  }
  
  
  
}


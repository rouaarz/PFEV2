import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/Test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:8083/tests'; // Mets l'URL de ton backend ici
  private TSUrl = 'http://localhost:8083/api/test-questions'; // Mets l'URL de ton backend ici
  private RSUrl = 'http://localhost:8083/api/responses/submit'; 
  constructor(private http: HttpClient) {}

  getTestDetails(testId: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${testId}/details`);
  }
  getAvailableTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/public`);
  }
  getQuestionsForTest(testId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.TSUrl}/test/${testId}`);
  }
  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${id}/details`);
  }
}

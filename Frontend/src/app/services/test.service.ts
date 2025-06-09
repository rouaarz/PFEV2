import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/Test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:8083/tests'; // Mets l'URL de ton backend ici
  private TSUrl = 'http://localhost:8083/api/test-questions'; // Mets l'URL de ton backend ici
  private RSUrl = 'http://localhost:8083/api/responses/submit'; 
  private apiAnalyse = `http://localhost:8083/api/responses/mes-reponses`;  // Adapte l'URL de ton API

  constructor(private http: HttpClient) {}

  getTestDetails(testId: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${testId}/details`);
  }
  getAvailableTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/publies/admin`);
  }
  getTestsDuChef( token: string) :Observable<Test[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Test[]>(`${this.apiUrl}/publies/du-chef`, { headers });
  }
  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}`);
  }
  getTestsForCurrentUser( token: string): Observable<Test[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Test[]>(`${this.apiUrl}/ForCurrentUser`, { headers });
  }
  getQuestionsForTest(testId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.TSUrl}/test/${testId}`);
  }
  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${id}/details`);
  }
//   getSuggestedTests(email: string, technologie: string, niveau: string) {
//   return this.http.get<any[]>(`${this.apiUrl}`, {
//     params: {
//       email,
//       technologie,
//       niveau
//     }
//   });
// }
getTestsSuggeres(emailDev: string, technologie: string, niveauDifficulte: string, isNext: boolean): Observable<Test[]> {
  const payload = {
    emailDev,
    technologie,
    niveauDifficulte,
    isNext
  };

  const url = `${this.apiUrl}/suggestions`; // <- ajoute /suggestions ici
  return this.http.post<Test[]>(url, payload);
}


 
  addQuestionsToTest(testId: number, testQuestions: any[], token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.TSUrl}/add/${testId}`, testQuestions, { headers });
  }
  removeQuestionFromTest(testId: number, questionId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.TSUrl}/remove/${testId}/${questionId}`, { headers });
  }

  createTest(test: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/create`, test, { headers });
  }

  // Mettre à jour un test (ADMIN et ChefProjet uniquement)
  updateTest(testId: number, updatedTest: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${testId}`, updatedTest, { headers });
  }
  publishTest(testId: number, publishTestRequest: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${testId}/publish`, publishTestRequest, { headers });
  }
  
  

  isTestCompleted(testId: number, developpeurId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/isCompleted?testId=${testId}&developpeurId=${developpeurId}`
    );
  }
  generateTest(testGenerationRequest: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/generate`, testGenerationRequest, { headers });
  }
  generateQuestions(testGenerationRequest: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/questions`, testGenerationRequest, { headers });
  }
  getMesReponses(testId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiAnalyse}/${testId}`, { headers });
  }
  deleteTest(id: number, token: string) {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
getTestCountByNiveau(niveau: string): Observable<number> {
  return this.http.get<number>(`http://localhost:8083/tests/count/niveau/${niveau}`);
}

}


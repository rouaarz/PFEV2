// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ScoreService {
//   private apiUrl = 'http://localhost:8083/api/score'; // Mets l'URL de ton backend ici

//   constructor(private http: HttpClient) {}

//   // Méthode pour récupérer le score du développeur pour un test donné
//   getScore(testId: number, developpeurId: number): Observable<{ status: string; score: number }> {
//     return this.http.get<{ status: string; score: number }>(`${this.apiUrl}/${testId}/${developpeurId}`);
//   }
// }
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class ScoreService {
//   private apiUrl = 'http://localhost:8083/api/score'; // Mets l'URL de ton backend ici

//   constructor(private http: HttpClient, private router: Router) {}

//   getScore(testId: number, developpeurId: number): Observable<{ status: string; score: number }> {

//     const token = localStorage.getItem('accessToken'); // Récupérer le token

//     if (!token) {
//       alert('Vous devez être connecté pour voir votre score.');
//       this.router.navigate(['/login']); // Rediriger vers la page de login
//       throw new Error('Utilisateur non authentifié'); // Arrêter l'exécution
//     }

//     // Ajouter le token dans les headers
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });

//     return this.http.get<{ status: string; score: number }>(
//       `${this.apiUrl}/${testId}/${developpeurId}`,
//       { headers }
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DeveloppeurResultResponse} from '../models/DeveloppeurResultResponse '
import {TestStatsResponse} from '../models/TestStatsResponse '

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private apiUrl = 'http://localhost:8083/api/score'; // Remplace par ton URL backend
  private apiAnalyse = 'http://localhost:8083/api/responses/dev-reponses';
  constructor(private http: HttpClient) {}

  getScore(testId: number, developpeurId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${testId}/${developpeurId}`, { headers });
  }
  // Calculer le score d'un test donné
  calculateScore(testId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/calculer/${testId}`, { headers });
  }
   getResultats(testId: number) {
  return this.http.get<DeveloppeurResultResponse[]>(`${this.apiUrl}/test/${testId}`);
}

getStats(testId: number) {
  return this.http.get<TestStatsResponse>(`${this.apiUrl}/stats/${testId}`);
}
getDevReponses(testId: number,devId:number, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiAnalyse}/${testId}/${devId}`, { headers });
  }
}

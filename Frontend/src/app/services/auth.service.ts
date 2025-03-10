// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
// import { SignupData } from '../models/SignupData';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
  
//   private apiUrl = 'http://localhost:8083/api/auth';

//   constructor(private http: HttpClient) {} // ✅ HttpClient injecté correctement

//   signup(signupData: SignupData): Observable<any> { // Utilisation de l'interface SignupData
//     return this.http.post(`${this.apiUrl}/signup`, signupData);
//   }


// login(loginData: any): Observable<any> {
//   return this.http.post(`${this.apiUrl}/signin`, loginData).pipe(
//     catchError(this.handleError) // Optionnel : pour gérer les erreurs HTTP de manière centralisée
//   );
// }
// private handleError(error: HttpErrorResponse): Observable<never> {
//   let errorMessage = 'Une erreur inconnue s\'est produite !';

//   if (error.error instanceof ErrorEvent) {
//     // Erreur côté client ou réseau
//     errorMessage = `Erreur: ${error.error.message}`;
//   } else {
//     // Erreur côté serveur
//     errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
//   }

//   // Retourner l'erreur sous forme observable pour que les abonnés puissent la gérer
//   return throwError(() => new Error(errorMessage));
// }
// getAccessToken(): string | null {
//   return localStorage.getItem('accessToken');
// }


// // Exemple pour stocker un token
// setAccessToken(token: string): void {
//   localStorage.setItem('access_token', token);
// }

// // Exemple pour supprimer le token
// removeAccessToken(): void {
//   localStorage.removeItem('access_token');
// }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { SignupData } from '../models/SignupData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8083/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken()); // Vérifie si un token existe au démarrage
  authStatus$ = this.authStatus.asObservable(); // Observable pour écouter les changements d'état

  constructor(private http: HttpClient) {}

  signup(signupData: SignupData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, signupData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inconnue s\'est produite !';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  // Vérifie si un token est présent
  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Récupérer le token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Stocker le token et mettre à jour l'état de connexion
  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
    this.authStatus.next(true); // Met à jour l'état de connexion
  }

  // Supprimer le token et mettre à jour l'état de connexion
  removeAccessToken(): void {
    localStorage.removeItem('accessToken');
    this.authStatus.next(false); // Met à jour l'état de connexion
  }
}

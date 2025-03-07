import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SignupData } from '../models/SignupData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8083/api/auth';

  constructor(private http: HttpClient) {} // ✅ HttpClient injecté correctement

  signup(signupData: SignupData): Observable<any> { // Utilisation de l'interface SignupData
    return this.http.post(`${this.apiUrl}/signup`, signupData);
  }

 login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, loginData);
  
  }
  

}

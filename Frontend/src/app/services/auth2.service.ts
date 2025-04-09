
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {
  private apiUrl ='http://localhost:8083/api/auth' ;

  constructor(private http: HttpClient) { }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: { token: string, newPassword: string, confirmPassword: string })  {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

   resendResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-email`, { email });
  }
  

}

// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8083/api/admin';

  constructor(private http: HttpClient) {}


  getInactiveUsers(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/inactive-users`, { headers });
  }

 
  activerCompte(email: string,token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.apiUrl}/activate?email=${email}`, null, { headers });
  }
  
  
  supprimerCompte(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete?email=${email}`);
  }
  getActiveUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active-users`);
  }
  
  desactiverCompte(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deactivate?email=${email}`, null);
  }
  
}

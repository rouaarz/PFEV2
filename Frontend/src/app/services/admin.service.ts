// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrateur } from '../models/administrateur';

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
  
  
 /* updateAdmin(id: number, data: FormData, token: string): Observable<any> {
    console.log('🔎 Token envoyé :', token); // Ajoute ça
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // Ne pas mettre 'Content-Type' ici pour FormData !!
    });
  
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { headers });
  }
  
  // (optionnel) Pour récupérer les infos de l'admin actuel
  getAdminById(id: number, token: string): Observable<Administrateur> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Administrateur>(`${this.apiUrl}/get/${id}`, { headers });
  }
  */
  supprimerCompte(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete?email=${email}`);
  }
  getActiveUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active-users`);
  }
  
  desactiverCompte(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deactivate?email=${email}`, null);
  }
  updateAdmin(id: number, data: FormData, token: string): Observable<Administrateur> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Administrateur>(`${this.apiUrl}/update/${id}`, data, { headers });
  }

  updateAdminPassword(id: number, data: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/update-password/${id}`, data, { headers });
  }

  getAdminById(id: number, token: string): Observable<Administrateur> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Administrateur>(`${this.apiUrl}/get/${id}`, { headers });
  }
  updateAdminPhoto(adminId: number, imageFile: File, token: string): Observable<Administrateur> {
    const url = `http://localhost:8083/api/admin/update-photo/${adminId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('image', imageFile);
  
    return this.http.put<Administrateur>(url, formData, { headers });
  }
  
  
}

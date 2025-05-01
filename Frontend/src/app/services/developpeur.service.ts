import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developpeur } from '../../app/models/developpeur'; // Assure-toi que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class DeveloppeurService {
  private apiUrl = 'http://localhost:8083/api/developpeurs';

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getDeveloppeurProfile(id: number): Observable<Developpeur> {
    return this.http.get<Developpeur>(`${this.apiUrl}/${id}`);
  }

  updateDeveloppeurProfile(id: number, profile: Developpeur): Observable<Developpeur> {
    return this.http.put<Developpeur>(`${this.apiUrl}/${id}`, profile);
  }

  getTechnologiesSuggestions(): Observable<string[]> {
    return this.http.get<string[]>('/assets/data/technologies.json');
  }
  // GET /developpeur/get/{id}
  getDeveloppeurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`, {
      headers: this.getAuthHeaders()
    });}

  // PUT /developpeur/update/{id}
  updateDeveloppeur(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  // PUT /developpeur/update-password/{id}
  updatePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    return this.http.put(`${this.apiUrl}/update-password/${id}`, null, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  // PUT /developpeur/update-photo/{id}
  updatePhoto(id: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.put(`${this.apiUrl}/update-photo/${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }
}


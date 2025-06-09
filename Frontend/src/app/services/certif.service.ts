import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certification } from '../models/certification';

@Injectable({
  providedIn: 'root'
})
export class CertifService {

  private apiUrl = 'http://localhost:8083/api/certifications';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken'); // ou sessionStorage si c'est stocké là
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCertificationsByDeveloppeurId(developpeurId: number): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.apiUrl}/${developpeurId}`, {
      headers: this.getAuthHeaders()
    });
  }

  downloadCertification(id: number): Observable<Blob> {
    return this.http.get(`http://localhost:8083/api/certification/download/${id}`, {
      responseType: 'blob',
      headers: this.getAuthHeaders()
    });
  }

  shareCertification(id: number): Observable<string> {
    return this.http.get(`http://localhost:8083/api/certifications/${id}/share`, {
      responseType: 'text',
      headers: this.getAuthHeaders()
    });
  }
}

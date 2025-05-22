import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { DeveloppeurDashboardDTO } from '../models/developpeur-dashboard-dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_PHOTO = 'http://localhost:8083/api/user/users/photo';
  private readonly API_USER_INFO = 'http://localhost:8083/api/user/users/info';
  private readonly apiUrl='http://localhost:8083/api/dashboard';
  constructor(private http: HttpClient) {}

  getUserPhoto(): Observable<Blob> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('Aucun token trouvé dans le stockage local.');
      return throwError(() => new Error('Utilisateur non authentifié'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(this.API_PHOTO, {
      headers,
      responseType: 'blob'
    });
  }
  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User>(this.API_USER_INFO, { headers });
  }
  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User>(`http://localhost:8083/api/user/${id}`, { headers });
  }
  getDashboardByDeveloppeurId(id: number): Observable<DeveloppeurDashboardDTO> {
    return this.http.get<DeveloppeurDashboardDTO>(`${this.apiUrl}/${id}`);
  }
  
 
  
  
  
}


/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developpeur } from '../../app/models/developpeur'; // Assure-toi que ce chemin est correct
import { DeveloppeurDashboardDTO } from '../models/developpeur-dashboard-dto';

@Injectable({
  providedIn: 'root'
})
export class DeveloppeurService {
  private apiUrl = 'http://localhost:8083/api/developpeurs';
  private readonly apiUrl2='http://localhost:8083/api/dashboard';

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
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
   getDashboardByDeveloppeurId(id: number): Observable<DeveloppeurDashboardDTO> {
      return this.http.get<DeveloppeurDashboardDTO>(`${this.apiUrl2}/${id}`,{
        headers: this.getAuthHeaders()
      });
    }
    
}

*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developpeur } from '../../app/models/developpeur';
import { DeveloppeurDashboardDTO } from '../models/developpeur-dashboard-dto';

@Injectable({
  providedIn: 'root'
})
export class DeveloppeurService {
  private apiUrl = 'http://localhost:8083/api/developpeurs';
  private readonly apiUrl2 = 'http://localhost:8083/api/dashboard';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Ajout des headers ici
  getDeveloppeurProfile(id: number): Observable<Developpeur> {
    return this.http.get<Developpeur>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Ajout des headers ici
  updateDeveloppeurProfile(id: number, profile: Developpeur): Observable<Developpeur> {
    return this.http.put<Developpeur>(`${this.apiUrl}/${id}`, profile, {
      headers: this.getAuthHeaders()
    });
  }

  /*getDeveloppeurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`, {
      headers: this.getAuthHeaders()
    });
  }*/

updateDeveloppeur(id: number, formData: FormData, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.put(`${this.apiUrl}/update/${id}`, formData, { headers });
}


  updatePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    return this.http.put(`${this.apiUrl}/update-password/${id}`, null, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
updatePhoto(id: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('image', file); // ✅ Correspond exactement à @RequestParam("image")

  return this.http.put(`${this.apiUrl}/update-photo/${id}`, formData, {
    headers: this.getAuthHeaders()
  });
}
getPhoto(id: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/photo/${id}`, {
    responseType: 'blob',
    headers: this.getAuthHeaders()
  });
}




  getDashboardByDeveloppeurId(id: number): Observable<DeveloppeurDashboardDTO> {
    return this.http.get<DeveloppeurDashboardDTO>(`${this.apiUrl2}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}

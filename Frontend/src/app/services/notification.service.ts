import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Notification {
  unread: unknown;
  id: number;
  message: string;
  lu: boolean;
  dateNotification: string;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8083/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/unread`);
  }

  markAllAsRead(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/mark-as-read`, {});
  }
  // Modifiez la méthode getNotifications pour récupérer toutes les notifications
getAllNotifications(): Observable<Notification[]> {
  return this.http.get<Notification[]>(this.apiUrl); // Supprimez '/unread'
}

// Gardez la méthode pour les non-lues si nécessaire ailleurs
getUnreadNotifications(): Observable<Notification[]> {
  return this.http.get<Notification[]>(`${this.apiUrl}/unread`);
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, Notification } from '../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-comp',
  templateUrl: './navbar-comp.component.html',
  standalone: true,
  styleUrls: ['./navbar-comp.component.scss'],
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, CommonModule]
})
export class NavbarCompComponent implements OnInit {
  snackBar: any;

  

  
  markAllAsRead(): void {
    if (this.notifications.length === 0) {
      this.snackBar.open('Aucune notification disponible', 'Fermer', {
        duration: 2000,
        panelClass: 'info-snackbar'
      });
      return;
    }
  
    // Vérifie si des notifications sont non lues
    const hasUnread = this.notifications.some(notif => notif.lu === false);
    
    if (!hasUnread) {
      this.snackBar.open('Toutes les notifications sont déjà lues', 'Fermer', {
        duration: 2000,
        panelClass: 'info-snackbar'
      });
      return;
    }
  
    // Appel au service backend
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        // Mise à jour de l'état local
        this.notifications = this.notifications.map(notif => ({
          ...notif,
          lu: true,
          unread: false
        }));
        
        this.newItemsCount = 0;
        
        this.snackBar.open('Notifications marquées comme lues', 'Fermer', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
        
        // Optionnel: Rafraîchir la liste si nécessaire
        // this.loadNotifications();
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.snackBar.open('Échec de la mise à jour', 'Réessayer', {
          duration: 4000,
          panelClass: 'error-snackbar'
        }).onAction().subscribe(() => this.markAllAsRead());
      }
    });
  }
  notifications: Notification[] = [];
  showNotifications = false;
  newItemsCount = 0;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();

    // Recharger toutes les 30 sec
    setInterval(() => {
      this.loadNotifications();
    }, 30000);
  }

  /*loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifs) => {
        this.notifications = notifs;
        this.newItemsCount = notifs.length;
      },
      error: (err) => console.error('Erreur de chargement des notifications', err)
    });
  }*/
// Changez loadNotifications pour utiliser getAllNotifications
loadNotifications(): void {
  this.notificationService.getAllNotifications().subscribe({
    next: (notifs) => {
      this.notifications = notifs;
      // Calculer seulement les non lues pour le badge
      this.newItemsCount = notifs.filter(notif => !notif.lu).length;
    },
    error: (err) => console.error('Erreur de chargement des notifications', err)
  });
}
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (!this.showNotifications) {
      this.newItemsCount = 0;
      this.notificationService.markAllAsRead().subscribe();
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
  /*goToNotification(link?: string): void {
    if (link) {
      this.router.navigate([link]);
      this.showNotifications = false; // on cache le panneau
      this.newItemsCount = 0; // on réinitialise le compteur
      this.notificationService.markAllAsRead().subscribe(); // marquer comme lue
    }
  }*/
    goToNotification(link?: string): void {
      if (link) {
        this.router.navigate([link]);
        this.showNotifications = false;
        
        // Mettre à jour localement sans recharger
        const unreadNotifications = this.notifications.filter(n => !n.lu);
        if (unreadNotifications.length > 0) {
          this.newItemsCount = 0;
          this.notifications = this.notifications.map(n => ({...n, lu: true}));
          this.notificationService.markAllAsRead().subscribe();
        }
      }
    }
}

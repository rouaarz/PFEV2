// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NotificationService, Notification } from '../../services/notification.service';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// <<<<<<< Updated upstream
// import { MatBadgeModule } from '@angular/material/badge';
// =======
// >>>>>>> Stashed changes
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-navbar-comp',
//   templateUrl: './navbar-comp.component.html',
//   standalone: true,
//   styleUrls: ['./navbar-comp.component.scss'],
// <<<<<<< Updated upstream
//   imports: [MatIconModule, MatButtonModule, MatBadgeModule, CommonModule]
// })
// export class NavbarCompComponent implements OnInit {
//   snackBar: any;
// =======
//   imports:[MatIconModule,MatButtonModule,CommonModule]
// })
// export class NavbarCompComponent {
//   roles = JSON.parse(localStorage.getItem('roles') || '[]'); // ⚠️ Vérifie que `roles` est bien stocké
// >>>>>>> Stashed changes

  
// <<<<<<< Updated upstream

  
//   markAllAsRead(): void {
//     if (this.notifications.length === 0) {
//       this.snackBar.open('Aucune notification disponible', 'Fermer', {
//         duration: 2000,
//         panelClass: 'info-snackbar'
//       });
//       return;
//     }
  
//     // Vérifie si des notifications sont non lues
//     const hasUnread = this.notifications.some(notif => notif.lu === false);
    
//     if (!hasUnread) {
//       this.snackBar.open('Toutes les notifications sont déjà lues', 'Fermer', {
//         duration: 2000,
//         panelClass: 'info-snackbar'
//       });
//       return;
//     }
  
//     // Appel au service backend
//     this.notificationService.markAllAsRead().subscribe({
//       next: () => {
//         // Mise à jour de l'état local
//         this.notifications = this.notifications.map(notif => ({
//           ...notif,
//           lu: true,
//           unread: false
//         }));
        
//         this.newItemsCount = 0;
        
//         this.snackBar.open('Notifications marquées comme lues', 'Fermer', {
//           duration: 3000,
//           panelClass: 'success-snackbar'
//         });
        
//         // Optionnel: Rafraîchir la liste si nécessaire
//         // this.loadNotifications();
//       },
//       error: (err) => {
//         console.error('Erreur:', err);
//         this.snackBar.open('Échec de la mise à jour', 'Réessayer', {
//           duration: 4000,
//           panelClass: 'error-snackbar'
//         }).onAction().subscribe(() => this.markAllAsRead());
//       }
//     });
// =======
//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/signin']); // Redirection vers la page de connexion
// >>>>>>> Stashed changes
//   }
//   notifications: Notification[] = [];
//   showNotifications = false;
//   newItemsCount = 0;

//   constructor(
//     private router: Router,
//     private notificationService: NotificationService
//   ) {}

//   ngOnInit(): void {
//     this.loadNotifications();

//     // Recharger toutes les 30 sec
//     setInterval(() => {
//       this.loadNotifications();
//     }, 30000);
//   }

//   /*loadNotifications(): void {
//     this.notificationService.getNotifications().subscribe({
//       next: (notifs) => {
//         this.notifications = notifs;
//         this.newItemsCount = notifs.length;
//       },
//       error: (err) => console.error('Erreur de chargement des notifications', err)
//     });
//   }*/
// // Changez loadNotifications pour utiliser getAllNotifications
// loadNotifications(): void {
//   this.notificationService.getAllNotifications().subscribe({
//     next: (notifs) => {
//       this.notifications = notifs;
//       // Calculer seulement les non lues pour le badge
//       this.newItemsCount = notifs.filter(notif => !notif.lu).length;
//     },
//     error: (err) => console.error('Erreur de chargement des notifications', err)
//   });
// }
//   toggleNotifications(): void {
//     this.showNotifications = !this.showNotifications;
//     if (!this.showNotifications) {
//       this.newItemsCount = 0;
//       this.notificationService.markAllAsRead().subscribe();
//     }
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.router.navigate(['/signin']);
//   }
//   /*goToNotification(link?: string): void {
//     if (link) {
//       this.router.navigate([link]);
//       this.showNotifications = false; // on cache le panneau
//       this.newItemsCount = 0; // on réinitialise le compteur
//       this.notificationService.markAllAsRead().subscribe(); // marquer comme lue
//     }
//   }*/
//     goToNotification(link?: string): void {
//       if (link) {
//         this.router.navigate([link]);
//         this.showNotifications = false;
        
//         // Mettre à jour localement sans recharger
//         const unreadNotifications = this.notifications.filter(n => !n.lu);
//         if (unreadNotifications.length > 0) {
//           this.newItemsCount = 0;
//           this.notifications = this.notifications.map(n => ({...n, lu: true}));
//           this.notificationService.markAllAsRead().subscribe();
//         }
//       }
//     }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, Notification } from '../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar-comp',
  templateUrl: './navbar-comp.component.html',
  standalone: true,
  styleUrls: ['./navbar-comp.component.scss'],
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, CommonModule]
})
export class NavbarCompComponent implements OnInit {
  notifications: Notification[] = [];
  showNotifications = false;
  newItemsCount = 0;
  roles = JSON.parse(localStorage.getItem('roles') || '[]');
  user!: User ;
 userId = localStorage.getItem('developpeurId');


  userPhotoUrl: string | null = null;
  isUserMenuOpen=false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  /*ngOnInit(): void {
    this.userPhotoUrl = localStorage.getItem('photoURL'); // Exemple
    this.loadNotifications();

    // Auto-refresh every 30 seconds
    setInterval(() => {
      this.loadNotifications();
    }, 30000);
  }
  
  ngOnInit(): void {
    this.loadNotifications();
  
    this.userService.getUserPhoto().subscribe({
      next: (blob: Blob) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64Image = reader.result as string;
          console.log("Image base64:", base64Image); // pour débogage
          this.userPhotoUrl = base64Image;
        };
  
        reader.onerror = (e) => {
          console.error('Erreur lors de la lecture du blob image', e);
        };
  
        reader.readAsDataURL(blob);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la photo utilisateur', err);
      }
    });
  */
    ngOnInit(): void {
      this.loadNotifications();
    
      if (this.userId) {
        this.userService.getUserById(+this.userId).subscribe({
          next: (userData) => {
            this.user = userData;
          },
          error: (err) => {
            console.error("Erreur lors de la récupération de l'utilisateur", err);
          }
        });
      }
    
      this.userService.getUserPhoto().subscribe({
        next: (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.userPhotoUrl = reader.result as string;
          };
          reader.readAsDataURL(blob);
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la photo utilisateur', err);
        }
      });
    
      setInterval(() => {
        this.loadNotifications();
      }, 30000);
    }
    
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    }
  
    openSettings() {
      this.isUserMenuOpen = false;
      // Logique pour ouvrir la page des paramètres
    }
  
   
      // Logique pour aller au profil utilisateur
   viewProfile() {
        this.router.navigate(['admin/edit', this.userId]);

  }

  
    manageAccounts() {
      this.isUserMenuOpen = false;
      // Logique pour la gestion des comptes (ex: redirection vers une autre page)
      this.router.navigate(['admin/activation-Compte']); // exemple
    }
  

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (notifs) => {
        this.notifications = notifs;
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

  goToNotification(link?: string): void {
    if (link) {
      this.router.navigate([link]);
      this.showNotifications = false;

      const unreadNotifications = this.notifications.filter(n => !n.lu);
      if (unreadNotifications.length > 0) {
        this.newItemsCount = 0;
        this.notifications = this.notifications.map(n => ({ ...n, lu: true }));
        this.notificationService.markAllAsRead().subscribe();
      }
    }
  }

  markAllAsRead(): void {
    if (this.notifications.length === 0) {
      alert('Aucune notification disponible');
      return;
    }

    const hasUnread = this.notifications.some(notif => !notif.lu);
    if (!hasUnread) {
      alert('Toutes les notifications sont déjà lues');
      return;
    }

    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map(notif => ({
          ...notif,
          lu: true,
          unread: false
        }));
        this.newItemsCount = 0;
        alert('Notifications marquées comme lues');
      },
      error: (err) => {
        console.error('Erreur:', err);
        if (confirm('Échec de la mise à jour. Réessayer ?')) {
          this.markAllAsRead();
        }
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}

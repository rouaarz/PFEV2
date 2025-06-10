import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from '../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activation-compte',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, RouterModule, NgxPaginationModule],
  standalone: true,
  templateUrl: './activation-compte.component.html',
  styleUrls: ['./activation-compte.component.scss']
})
export class ActivationCompteComponent implements OnInit {
  searchTerm: string = ''; // Search term
  filteredUsers: any[] = []; // Filtered users based on search
  currentPage: number = 1; // Pagination: current page
  itemsPerPage: number = 5; // Number of items per page
  users: User[] = [];
  error: string = '';
  token = localStorage.getItem('accessToken') ?? '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getInactiveUsers(this.token).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data; // Initialize filtered users with all users
      },
      error: (err) => this.error = 'Erreur lors du chargement des comptes'
    });
  }
// activateUser(email: string) {
//     Swal.fire({
//       title: 'Activer ce compte ?',
//       text: 'Cette action activera le compte utilisateur.',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Oui, activer',
//       cancelButtonText: 'Annuler'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.adminService.activerCompte(email, this.token).subscribe({
//           next: () => {
//             this.filteredUsers = this.filteredUsers.filter(user => user.email !== email);
//             Swal.fire('Activé', 'Le compte a été activé avec succès.', 'success');
//           },
//           error: () => {
//             this.error = "Erreur lors de l'activation";
//             Swal.fire('Erreur', this.error, 'error');
//           }
//         });
//       }
//     });
//   }
activateUser(email: string) {
  Swal.fire({
    title: 'Activer ce compte ?',
    text: 'Cette action activera le compte utilisateur.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui, activer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {

      // Affiche le loader pendant le traitement
      Swal.fire({
        title: 'Activation en cours...',
        text: 'Veuillez patienter pendant l\'envoi de l\'email...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.adminService.activerCompte(email, this.token).subscribe({
        next: () => {
          // Ferme le loader
          Swal.close();

          // Mise à jour de la liste
          this.filteredUsers = this.filteredUsers.filter(user => user.email !== email);

          // Affiche succès
          Swal.fire('Activé', 'Le compte a été activé avec succès.', 'success');
        },
        error: () => {
          Swal.close();
          this.error = "Erreur lors de l'activation";
          Swal.fire('Erreur', this.error, 'error');
        }
      });
    }
  });
}

 deleteUser(email: string) {
    Swal.fire({
      title: 'Supprimer ce compte ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.supprimerCompte(email).subscribe({
          next: () => {
            this.filteredUsers = this.filteredUsers.filter(user => user.email !== email);
            Swal.fire('Supprimé', 'Le compte a été supprimé avec succès.', 'success');
          },
          error: () => {
            this.error = 'Erreur lors de la suppression';
            Swal.fire('Erreur', this.error, 'error');
          }
        });
      }
    });
  }
  // Search functionality
  searchComptes() {
    if (this.searchTerm.trim()) {
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
        //user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users; // Reset to all users if the search term is empty
    }
    // Reset the page number to 1 when performing a new search
    this.currentPage = 1;
  }

  // Pagination: on page change
  pageChanged(page: number) {
    this.currentPage = page;
  }
}

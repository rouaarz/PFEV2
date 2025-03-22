import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; // Ajoutez l'import pour la pagination

@Component({
  selector: 'app-comptes-actifs',
  templateUrl: './comptes-actifs.component.html',
  styleUrls: ['./comptes-actifs.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, NgxPaginationModule], // Ajoutez le module de pagination
  standalone: true
})
export class ComptesActifsComponent implements OnInit {
  searchTerm: string = ''; // Terme de recherche
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 3; // Nombre d'éléments par page
  usersActifs: any[] = []; // Liste des utilisateurs activés
  filteredUsers: any[] = []; // Utilisateurs filtrés par la recherche
  error: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadActiveUsers();
  }

  loadActiveUsers() {
    this.adminService.getActiveUsers().subscribe({
      next: (data) => {
        this.usersActifs = data;
        this.filteredUsers = data; // Initialiser la liste filtrée avec tous les utilisateurs actifs
      },
      error: () => this.error = 'Erreur lors du chargement des comptes actifs'
    });
  }

  deactivateUser(email: string) {
    // Afficher la boîte de confirmation
    const confirmDeactivation = window.confirm('Êtes-vous sûr de vouloir désactiver ce compte ?');
  
    if (confirmDeactivation) {
      // Si l'utilisateur confirme, procéder à la désactivation
      this.adminService.desactiverCompte(email).subscribe({
        next: () => {
          this.filteredUsers = this.filteredUsers.filter(user => user.email !== email);
          this.loadActiveUsers(); // Rafraîchir la liste
        },
        error: () => this.error = 'Erreur lors de la désactivation'
      });
    }
  }
  
  searchComptes() {
    if (this.searchTerm.trim()) {
      this.filteredUsers = this.usersActifs.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
        //user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.usersActifs; // Réinitialiser à la liste complète si le terme de recherche est vide
    }
    this.currentPage = 1; // Réinitialiser la page lorsque la recherche est effectuée
  }

  // Méthode pour gérer le changement de page
  pageChanged(page: number) {
    this.currentPage = page;
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from '../models/User';

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

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getInactiveUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data; // Initialize filtered users with all users
      },
      error: (err) => this.error = 'Erreur lors du chargement des comptes'
    });
  }

  activateUser(email: string) {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir activer ce compte ?");
    if (confirmation) {
      this.adminService.activerCompte(email).subscribe({
        next: () => {
          // Remove the activated user from the filtered list
          this.filteredUsers = this.filteredUsers.filter(user => user.email !== email);
        },
        error: () => this.error = "Erreur lors de l'activation"
      });
    }
  }

  deleteUser(email: string) {
    this.adminService.supprimerCompte(email).subscribe({
      next: () => {
        // Remove the deleted user from the filtered list
        this.filteredUsers = this.filteredUsers.filter(user => user.email !== email);
      },
      error: () => this.error = 'Erreur lors de la suppression'
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

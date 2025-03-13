import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comptes-actifs',
  templateUrl: './comptes-actifs.component.html',
  styleUrls: ['./comptes-actifs.component.css'],
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
    standalone: true
})
export class ComptesActifsComponent implements OnInit {
  usersActifs: any[] = [];
  error: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadActiveUsers();
  }

  loadActiveUsers() {
    this.adminService.getActiveUsers().subscribe({
      next: (data) => this.usersActifs = data,
      error: () => this.error = 'Erreur lors du chargement des comptes actifs'
    });
  }

  deactivateUser(email: string) {
    this.adminService.desactiverCompte(email).subscribe({
      next: () => {
        this.usersActifs = this.usersActifs.filter(user => user.email !== email);
        this.loadActiveUsers(); // Rafraîchir la liste
      },
      error: () => this.error = 'Erreur lors de la désactivation'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activation-compte',
 imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './activation-compte.component.html',
  styleUrl: './activation-compte.component.css'
})
export class ActivationCompteComponent implements OnInit {

  users: any[] = [];
  error: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getInactiveUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => this.error = 'Erreur lors du chargement des comptes'
    });
  }

  activateUser(email: string) {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir activer ce compte ?");
    if (confirmation) {
      this.adminService.activerCompte(email).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.email !== email);
        },
        error: () => this.error = "Erreur lors de l'activation"
      });
    }
  }
  

  deleteUser(email: string) {
    this.adminService.supprimerCompte(email).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.email !== email);
      },
      error: () => this.error = 'Erreur lors de la suppression'
    });
  }
}
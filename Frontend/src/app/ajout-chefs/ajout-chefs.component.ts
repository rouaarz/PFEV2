import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChefDeProjetService } from '../services/chef-de-projet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajout-chefs',
  templateUrl: './ajout-chefs.component.html',
  styleUrls: ['./ajout-chefs.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule,RouterModule],
})
export class AjoutChefsComponent implements OnInit {
  chefDeProjet: any = {
    id: null,
    username: '',
    email: '',
    password: '',
    specialite: '',
    score: 0,
    developpeurs: [],
    active: true,
    roles: [{ name: 'ROLE_CHEF', id: 4 }],
  };

  usernameExists = false;
  emailExists = false;
  errorMessages: string[] = [];
  idChef?: number;
  token = localStorage.getItem('accessToken') ?? '';
  isLoading = false;  // Add this line to track the loading state

  constructor(
    private chefService: ChefDeProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idChef = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idChef) {
      this.loadChefDeProjet(this.idChef);
    }
  }

  loadChefDeProjet(id: number) {
    this.chefService.getChefById(id).subscribe({
      next: (data) => {
        if (data) {
          this.chefDeProjet = data;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
      },
    });
  }

  ajouterChef() {
    this.errorMessages = [];
    this.isLoading = true;  // Set loading state to true before starting the request

    // Vérification du format de l'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.chefDeProjet.email)) {
      this.errorMessages.push('⚠️ Veuillez entrer une adresse email valide.');
    }

    if (this.errorMessages.length > 0) {
      this.isLoading = false;  // Hide loader if errors are found
      return;
    }
    this.chefService.ajouterChef(this.chefDeProjet, this.token).subscribe({
      next: () => {
        this.isLoading = false;  // Hide loader after the process is done
        alert('✅ Chef de projet ajouté avec succès !');
        this.router.navigate(['admin/list-Chefs']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout', error);
        this.isLoading = false;  // Hide loader if there is an error
        this.errorMessages.push('❌ Une erreur est survenue.');
      },
    });
  }

  verifierUsername() {
    this.chefService.verifierUsername(this.chefDeProjet.username).subscribe({
      next: (exists) => (this.usernameExists = exists),
      error: (error) => console.error('Erreur vérification username', error),
    });
  }

  verifierEmail() {
    this.chefService.verifierEmail(this.chefDeProjet.email).subscribe({
      next: (exists) => (this.emailExists = exists),
      error: (error) => console.error('Erreur vérification email', error),
    });
  }
}

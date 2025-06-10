import { Component, OnInit } from '@angular/core';
import { ChefDeProjetService } from '../services/chef-de-projet.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Developpeur } from '../models/developpeur';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-developpeur',
  templateUrl: './assign-developpeur.component.html',
  styleUrls: ['./assign-developpeur.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgxPaginationModule, RouterModule],
})
export class AssignDeveloppeurComponent implements OnInit {
  searchTerm: string = '';
  chefDeProjet: any = {}; // Stocke le chef de projet sélectionné
  developpeurs: Developpeur[] = []; // Liste complète des développeurs
  // Liste des développeurs disponibles
  chefsAvecDeveloppeurs: any[] = []; // Liste des chefs avec leurs développeurs
  developpeursNonAssignes: any[] = [];
  currentPage: number = 1; // Page courante pour la pagination
  itemsPerPage: number = 5; // Nombre d'éléments par page
  filteredDeveloppeurs: any[] = []; // Liste filtrée des développeurs selon la recherche
  token = localStorage.getItem('accessToken') ?? '';

  constructor(
    private chefService: ChefDeProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDeveloppeurs();

    const id = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID du chef de projet
    if (!isNaN(id) && id > 0) {
      this.getChefDeProjet(id);
    } else {
      console.error('ID invalide');
    }
    this.filteredDeveloppeurs = [...this.developpeursNonAssignes];



  }

  // Récupérer les détails du chef de projet
  getChefDeProjet(id: number): void {
    this.chefService.getChefById(id).subscribe({
      next: (chef) => {
        this.chefDeProjet = chef;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du chef de projet', err);
      },
    });
  }

  // Récupérer tous les développeurs
  getDeveloppeurs(): void {
    this.chefService.getDeveloppeursNonAssignes().subscribe({
      next: (devs) => {
        this.developpeursNonAssignes = devs.filter(dev => !dev.isAssigned);
        this.filteredDeveloppeurs = [...this.developpeursNonAssignes]; // Initialiser la liste affichée
      },
      error: (err) => {
        console.error("Erreur lors du chargement des développeurs", err);
      }
    });
  }






  // Vérifier si un développeur est déjà assigné
  isAssigned(devId: number): boolean {
    const assigned = this.developpeurs.some(dev => dev.id == devId && dev.chefDeProjetId != null);
    console.log(`Développeur ID ${devId} est assigné : ${assigned}`);
    return assigned;
  }

  assignDeveloppeur(devId: number): void {
    this.chefService.isDeveloppeurAssigned(devId).subscribe({
      next: (isAssigned) => {
        if (isAssigned) {
          Swal.fire({
            icon: 'warning',
            title: 'Déjà assigné',
            text: 'Ce développeur est déjà assigné à un chef de projet !',
            confirmButtonText: 'OK',
          });
        } else {
          // Confirmer l'action avec SweetAlert
          Swal.fire({
            title: 'Assigner ce développeur ?',
            text: 'Souhaitez-vous vraiment assigner ce développeur à ce chef de projet ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, assigner',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.isConfirmed) {
              this.chefService.assignerDeveloppeur(this.chefDeProjet.id, devId, this.token).subscribe({
                next: (chef) => {
                  console.log("Développeur assigné avec succès :", chef);
                  this.chefDeProjet = chef;
                  this.developpeursNonAssignes = this.developpeursNonAssignes.filter(dev => dev.id !== devId);
                  this.searchDeveloppeurs(); // pour mettre à jour la recherche
                  Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Développeur assigné avec succès !',
                  });
                },
                error: (err) => {
                  console.error("Erreur lors de l'assignation du développeur", err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Une erreur est survenue lors de l'assignation.",
                  });
                }
              });
            }
          });
        }
      },
      error: (err) => {
        console.error("Erreur lors de la vérification de l'assignation", err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Erreur lors de la vérification de l'état d'assignation.",
        });
      }
    });
  }

  // Récupérer la liste des chefs avec leurs développeurs assignés
  getChefsAvecDeveloppeurs(): void {
    this.chefService.getAllChefs().subscribe({
      next: (chefs) => {
        this.chefsAvecDeveloppeurs = chefs.map(chef => ({
          ...chef,
          developpeurs: this.developpeurs.filter(dev => dev.chefDeProjetId === chef.id)
        }));
      },
      error: (err) => {
        console.error("Erreur lors du chargement des chefs et développeurs", err);
      }
    });
  }
  searchDeveloppeurs(): void {
    if (this.searchTerm.trim()) {
      this.filteredDeveloppeurs = this.developpeursNonAssignes.filter(dev =>
        dev.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dev.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredDeveloppeurs = [...this.developpeursNonAssignes]; // Réinitialiser si aucun terme de recherche
    }
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }
}

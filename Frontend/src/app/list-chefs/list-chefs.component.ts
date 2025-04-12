import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChefDeProjetService } from '../services/chef-de-projet.service';
import { ChefDeProjet } from '../models/chef-de-projet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-chefs',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule,RouterModule,NgxPaginationModule],
  templateUrl: './list-chefs.component.html',
  styleUrls: ['./list-chefs.component.scss']
})
export class ListChefsComponent implements OnInit {

  token!: string;

  developpeursAssignes: any[] = [];
  chefSelectionne: any = null;

  chefs: ChefDeProjet[] = [];
  searchTerm: string = '';
  pagedQuestions: any;
  currentPage = 1; 
  constructor(private chefService: ChefDeProjetService, private router: Router) {}

  ngOnInit() {
    this.getChefs();
    this.token = localStorage.getItem('accessToken') || '';
    console.log("🛠 token:", this.token);
  }

  // Récupérer la liste des chefs
  // getChefs() {
  //   this.chefService.getAllChefs( this.token).subscribe(
  //     (data: ChefDeProjet[]) => {
  //       this.chefs = data;
  //       console.log("Liste des chefs :", this.chefs);
  //     },
  //     (error) => {
  //       console.error("Erreur lors du chargement des chefs :", error);
  //     }
  //   );
  // }
  getChefs() {

    this.chefService.getAllChefs().subscribe(
      (data: ChefDeProjet[]) => {
        this.chefs = data;
        console.log("Liste des chefs :", this.chefs);
      },
      (error) => {
        console.error("Erreur lors du chargement des chefs :", error);
      }
    );
  }
  
  goToAddChefs() {
    this.router.navigate(['/admin/ajout-Chef']);
    }
  

  modifierChef(chef: ChefDeProjet) {  // Corrected the type from 'chefs' to 'ChefDeProjet'
    this.router.navigate(['/admin/edit-Chef', chef.id]); // Navigation vers la page de modification
  }


  // Supprimer un chef
  supprimerChef(id: number) {
    console.log(id);
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chef de projet ?')) {
      this.chefService.supprimerChef(id,this.token).subscribe(() => {
        alert('Chef supprimé avec succès !');
        this.getChefs(); // Recharger la liste après suppression
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }

  // Recherche de chefs par un terme de recherche
  searchChefs() {
    if (this.searchTerm.trim()) {
      this.chefService.getAllChefs().subscribe((data: ChefDeProjet[]) => {
        this.chefs = data.filter(chef =>
          chef.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          chef.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          chef.specialite.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    } else {
      this.getChefs(); // Si la recherche est vide, afficher tous les chefs
    }
  }
  assignDeveloppeur(chefId: number): void {
    this.router.navigate([`/admin/assign-developpeur/${chefId}`]);
  }
  voirDeveloppeursAssignes(chefId: number) {
    // Récupérer le chef sélectionné
    this.chefSelectionne = this.chefs.find(chef => chef.id === chefId);
    
    // Récupérer le token
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error("Le token est manquant !");
      return;
    }
  
    // Appel à l'API pour obtenir les développeurs assignés avec le token
    this.chefService.getDeveloppeursAssignes(chefId, token).subscribe(
      (data) => {
        this.developpeursAssignes = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des développeurs assignés", error);
      }
    );
  }
  
    // voirDeveloppeursAssignes(chefId: number) {
    //   // Récupérer le chef sélectionné
    //   this.chefSelectionne = this.chefs.find(chef => chef.id === chefId);
      
    //   // Appel à l'API pour obtenir les développeurs assignés
    //   this.chefService.getDeveloppeursAssignes(chefId).subscribe(
    //     (data) => {
    //       this.developpeursAssignes = data;
    //     },
    //     (error) => {
    //       console.error("Erreur lors de la récupération des développeurs assignés", error);
    //     }
    //   );
    // }
  
}

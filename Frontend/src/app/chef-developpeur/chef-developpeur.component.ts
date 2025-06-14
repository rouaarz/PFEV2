// import { Component } from '@angular/core';
// import { Developpeur } from '../models/developpeur';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { ChefDeProjetService } from '../services/chef-de-projet.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { ChefDeProjet } from '../models/chef-de-projet';
// import { switchMap } from 'rxjs';

// @Component({
//   selector: 'app-chef-developpeur',
//   standalone: true,
//   imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, RouterModule],
//   templateUrl: './chef-developpeur.component.html',
//   styleUrl: './chef-developpeur.component.scss'
// })
// export class ChefDeveloppeurComponent {

//   developpeursAssignes: any[] = [];
//   chefSelectionne: any = null;
//   chefs: ChefDeProjet[] = [];
//   token = localStorage.getItem('accessToken') ?? '';

//   constructor(
//     private route: ActivatedRoute,
//     private chefService: ChefDeProjetService
//   ) { }

//   ngOnInit(): void {
//     this.chefSelectionne = Number(this.route.snapshot.paramMap.get('id'));

//     if (!isNaN(this.chefSelectionne)) {
//       this.getDeveloppeursAssignes(this.chefSelectionne);
//     } else {
//       console.error('ID du chef de projet invalide');
//     }
//   }

//   getDeveloppeursAssignes(chefId: number): void {

 

//     this.chefService.getChefById(chefId).pipe(  // Utilisation de pipe avec switchMap
//       switchMap((chef) => {
//         this.chefSelectionne = chef;  // Stocke le chef
//         return this.chefService.getDeveloppeursAssignes(chefId, this.token);  // Retourne un observable pour les développeurs avec le token
//       })
//     ).subscribe({
//       next: (data) => {
//         this.developpeursAssignes = data;  // Stocke les développeurs
//       },
//       error: (error) => {
//         console.error("Erreur lors de la récupération des développeurs assignés", error);
//       }
//     });
//   }
//   // getDeveloppeursAssignes(chefId: number): void {
//   //   this.chefService.getChefById(chefId).pipe(  // Utilisation de pipe avec switchMap
//   //     switchMap((chef) => {
//   //       this.chefSelectionne = chef;  // Stocke le chef
//   //       return this.chefService.getDeveloppeursAssignes(chefId);  // Retourne un observable pour les développeurs
//   //     })
//   //   ).subscribe({
//   //     next: (data) => {
//   //       this.developpeursAssignes = data;  // Stocke les développeurs
//   //     },
//   //     error: (error) => {
//   //       console.error("Erreur lors de la récupération des développeurs assignés", error);
//   //     }
//   //   });
//   // }
//   // voirDeveloppeursAssignes(chefId: number) {
//   //   // Récupérer le chef sélectionné
//   //   this.chefSelectionne = this.chefs.find(chef => chef.id === chefId);

//   //   // Appel à l'API pour obtenir les développeurs assignés
//   //   this.chefService.getDeveloppeursAssignes(chefId).subscribe(
//   //     (data) => {
//   //       this.developpeursAssignes = data;
//   //     },
//   //     (error) => {
//   //       console.error("Erreur lors de la récupération des développeurs assignés", error);
//   //     }
//   //   );
//   // }
//   voirDeveloppeursAssignes(chefId: number) {
//     // Récupérer le chef sélectionné
//     this.chefSelectionne = this.chefs.find(chef => chef.id === chefId);



//     // Appel à l'API pour obtenir les développeurs assignés avec le token
//     this.chefService.getDeveloppeursAssignes(chefId, this.token).subscribe(
//       (data) => {
//         this.developpeursAssignes = data;
//       },
//       (error) => {
//         console.error("Erreur lors de la récupération des développeurs assignés", error);
//       }
//     );
//   }





// }


import { Component } from '@angular/core';
import { Developpeur } from '../models/developpeur';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChefDeProjetService } from '../services/chef-de-projet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChefDeProjet } from '../models/chef-de-projet';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-chef-developpeur',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './chef-developpeur.component.html',
  styleUrl: './chef-developpeur.component.scss'
})
export class ChefDeveloppeurComponent {

  developpeursAssignes: any[] = [];
  chefSelectionne: any = null;
  chefs: ChefDeProjet[] = [];
  token = localStorage.getItem('accessToken') ?? '';

  constructor(
    private route: ActivatedRoute,
    private chefService: ChefDeProjetService
  ) { }

  /*ngOnInit(): void {
    this.chefSelectionne = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(this.chefSelectionne)) {
      this.getDeveloppeursAssignes(this.chefSelectionne);
    } else {
      console.error('ID du chef de projet invalide');
    }
  }*/
 isAdminView = false;
  ngOnInit(): void {
  const routeId = this.route.snapshot.paramMap.get('id');
  const storedChefId = localStorage.getItem('developpeurId');

  if (routeId && !isNaN(+routeId)) {
     this.isAdminView = true;
    this.getDeveloppeursAssignes(+routeId);
  } else if (storedChefId && !isNaN(+storedChefId)) {
    // Cas : accès par un chef connecté sans :id
    this.getDeveloppeursAssignes(+storedChefId);
  } else {
    console.error('Aucun ID valide trouvé pour le chef de projet');
  }
}


  getDeveloppeursAssignes(chefId: number): void {

 

    this.chefService.getChefById(chefId).pipe(  // Utilisation de pipe avec switchMap
      switchMap((chef) => {
        this.chefSelectionne = chef;  // Stocke le chef
        return this.chefService.getDeveloppeursAssignes(chefId, this.token);  // Retourne un observable pour les développeurs avec le token
      })
    ).subscribe({
      next: (data) => {
        this.developpeursAssignes = data;  // Stocke les développeurs
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des développeurs assignés", error);
      }
    });
  }
  // getDeveloppeursAssignes(chefId: number): void {
  //   this.chefService.getChefById(chefId).pipe(  // Utilisation de pipe avec switchMap
  //     switchMap((chef) => {
  //       this.chefSelectionne = chef;  // Stocke le chef
  //       return this.chefService.getDeveloppeursAssignes(chefId);  // Retourne un observable pour les développeurs
  //     })
  //   ).subscribe({
  //     next: (data) => {
  //       this.developpeursAssignes = data;  // Stocke les développeurs
  //     },
  //     error: (error) => {
  //       console.error("Erreur lors de la récupération des développeurs assignés", error);
  //     }
  //   });
  // }
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
  voirDeveloppeursAssignes(chefId: number) {
    // Récupérer le chef sélectionné
    this.chefSelectionne = this.chefs.find(chef => chef.id === chefId);



    // Appel à l'API pour obtenir les développeurs assignés avec le token
    this.chefService.getDeveloppeursAssignes(chefId, this.token).subscribe(
      (data) => {
        this.developpeursAssignes = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des développeurs assignés", error);
      }
    );
  }





}



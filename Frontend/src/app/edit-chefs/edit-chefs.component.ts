import { Component } from '@angular/core';
import { ChefDeProjet } from '../models/chef-de-projet';
import { ChefDeProjetService } from '../services/chef-de-projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ERole } from '../models/erole';

@Component({
  selector: 'app-edit-chefs',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './edit-chefs.component.html',
  styleUrls: ['./edit-chefs.component.css']
})
export class EditChefsComponent {
ajouterChef() {
throw new Error('Method not implemented.');
}
  chefDeProjet: ChefDeProjet = {
    id:0,
    username: '',
    email: '',
    password: '',
    specialite: '',
    score: 0,
    developpeurs: [],
    active: true,
    roles: [{
      name: ERole.ROLE_CHEF,
      id: 4
    }]
  };

  usernameExists = false;
  emailExists = false;
  isEditing = false;

  constructor(
    private chefService: ChefDeProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer l'ID du chef de projet à partir de la route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      // Récupérer les informations du chef de projet par son ID
      this.chefService.getChefById(+id).subscribe((data) => {
        this.chefDeProjet = data;
      }, error => {
        console.error('Erreur lors de la récupération du chef de projet', error);
        alert('Erreur lors de la récupération du chef de projet');
      });
    }
  }

  modifierChef() {
    let messageErreur = '';

    if (this.usernameExists) {
      messageErreur += "⚠️ Ce nom d'utilisateur est déjà utilisé.\n";
    }

    if (this.emailExists) {
      messageErreur += "⚠️ Cet email est déjà utilisé.\n";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.chefDeProjet.email)) {
      messageErreur += 'Veuillez entrer une adresse email valide.\n';
    }

    if (messageErreur) {
      alert(messageErreur);
      return;
    }

    // Appel pour modifier le chef de projet
    this.chefService.modifierChef(this.chefDeProjet.id, this.chefDeProjet).subscribe(() => {
      alert('✅ Chef de projet modifié avec succès !');
      this.router.navigate(['/admin/list-Chefs']); // Redirection après modification
    }, error => {
      alert("❌ Erreur lors de la modification du chef de projet !");
      console.error('Erreur:', error);
    });
  }

 /* verifierUsername() {
    if (this.chefDeProjet.username) {
      this.chefService.verifierUsername(this.chefDeProjet.username).subscribe(
        exists => {
          this.usernameExists = !!exists;
          if (this.usernameExists) {
            alert("Ce nom d'utilisateur est déjà utilisé !");
          }
        },
        error => {
          alert("Erreur lors de la vérification du username !");
          console.error("Erreur:", error);
        }
      );
    }
  }

  verifierEmail() {
    if (this.chefDeProjet.email) {
      this.chefService.verifierEmail(this.chefDeProjet.email).subscribe(
        exists => {
          this.emailExists = !!exists;
          if (this.emailExists) {
            alert("Cet email est déjà utilisé !");
          }
        },
        error => {
          alert("Erreur lors de la vérification de l'email !");
          console.error("Erreur:", error);
        }
      );
    }
  }*/
}

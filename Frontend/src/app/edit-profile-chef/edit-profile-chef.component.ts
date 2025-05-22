import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefDeProjetService } from '../services/chef-de-projet.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChefDeProjet } from '../models/chef-de-projet';

@Component({
  selector: 'app-edit-profile-chef',
  templateUrl: './edit-profile-chef.component.html',
  standalone: true,
  styleUrls: ['./edit-profile-chef.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule]
})
export class EditProfileChefComponent implements OnInit {
  chefForm: FormGroup;
  selectedFile: File | null = null;
  chefId!: number;
  chef!: ChefDeProjet;
  chefPhoto: string = 'assets/images/default-user.png';
  selectedPhoto: string | ArrayBuffer | null = null;
  isLoading = false;
  showOldPassword = false;
  showNewPassword = false;
  personalInfoOpen = false;
  securityOpen = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chefService: ChefDeProjetService
  ) {
    this.chefForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      specialite: [''], 
      oldPassword: [''],
      newPassword: ['', [Validators.minLength(6)]],
      currentPassword: ['']
    });
  }


  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.redirectToLogin();
      return;
    }

    if (idParam && !isNaN(+idParam)) {
      this.chefId = +idParam;
      this.loadChefData(token);
    } else {
      this.redirectToDashboard();
    }
  }

  private loadChefData(token: string): void {
    this.isLoading = true;
    this.chefService.getChefById2(this.chefId, token).subscribe({
      next: (chef: ChefDeProjet) => {
        this.chef = chef;
        this.chefForm.patchValue({
          username: chef.username,
          email: chef.email,
          specialite: chef.specialite
        });

        if (chef.image) {
          this.chefPhoto = chef.image;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement chef:', err);
        this.redirectToDashboard();
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024 || !file.type.match('image.*')) {
        alert('Image invalide (max 2MB, type JPG/PNG)');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.selectedPhoto = reader.result);
      reader.readAsDataURL(file);
    }
  }

  updateField(field: string): void {
  if (!this.chefForm.get(field)?.valid) return;

  const token = localStorage.getItem('accessToken') ?? '';
  const value = this.chefForm.get(field)?.value;
  const data = new FormData();
  data.append(field, value);
  data.append('currentPassword', this.chefForm.get('currentPassword')?.value);

  this.isLoading = true;

  this.chefService.updateChefWithImage(this.chefId, data, token).subscribe({
    next: (updated: ChefDeProjet) => {
      this.chef = updated;
      this.isLoading = false;
      alert(`Le champ ${field} a été mis à jour avec succès !`);
        this.loadChefData(token);
    },
    error: (err) => {
      console.error(`Erreur lors de la mise à jour du champ ${field}:`, err);
      this.isLoading = false;
      alert(`Une erreur est survenue lors de la mise à jour du champ ${field}.`);
    }
  });
}

updatePassword(): void {
  if (
    !this.chefForm.get('oldPassword')?.valid ||
    !this.chefForm.get('newPassword')?.valid
  ) return;

  const token = localStorage.getItem('accessToken') ?? '';
  const oldPassword = this.chefForm.get('oldPassword')?.value;
  const newPassword = this.chefForm.get('newPassword')?.value;

  this.isLoading = true;
  this.chefService.updateChefPassword(this.chefId, oldPassword, newPassword, token).subscribe({
    next: () => {
      this.isLoading = false;
      alert('Mot de passe mis à jour avec succès !');
        this.loadChefData(token);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du mot de passe :', err);
      this.isLoading = false;
      alert('Erreur lors de la mise à jour du mot de passe.');
    }
  });
}

updateAll(): void {
  if (this.chefForm.invalid) return;

  const token = localStorage.getItem('accessToken') ?? '';
  const data = new FormData();
  Object.entries(this.chefForm.value).forEach(([key, value]) => {
    if (value) data.append(key, value as string);
  });

  this.isLoading = true;
  this.chefService.updateChefWithImage(this.chefId, data, token).subscribe({
    next: (updatedChef) => {
      this.chef = updatedChef;
      this.isLoading = false;
      alert('Profil mis à jour avec succès !');
        this.loadChefData(token);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du profil :', err);
      this.isLoading = false;
      alert('Une erreur est survenue lors de la mise à jour.');
    }
  });
}

  updatePhoto(): void {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner une image.');
      return;
    }
  
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.redirectToLogin(); 
      return;
    }
  
    this.isLoading = true;
  
    this.chefService.updateChefPhoto(this.chefId, this.selectedFile, token).subscribe({
      next: (updatedChef: ChefDeProjet) => {
        this.chef = updatedChef;
        this.chefPhoto = updatedChef.image ? updatedChef.image : 'assets/images/default-chef.png';
        this.selectedFile = null;
        this.isLoading = false;
        alert('Photo mise à jour avec succès !');
          this.loadChefData(token);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la photo:', err);
        this.isLoading = false;
        alert('Une erreur est survenue lors de la mise à jour de la photo.');
      }
    });
  }
  

  cancel(): void {
    this.chefForm.patchValue({
      username: this.chef.username,
      email: this.chef.email,
      specialite: this.chef.specialite
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  redirectToDashboard(): void {
    this.router.navigate(['/chef']);
  }
}

/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Administrateur } from '../models/administrateur';

@Component({
  selector: 'app-edit-profile-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './edit-profile-admin.component.html',
  styleUrls: ['./edit-profile-admin.component.scss']
})
export class EditProfileAdminComponent implements OnInit {
  adminForm: FormGroup;
  selectedFile: File | null = null;
  adminId!: number;
  admin!: Administrateur;

  adminPhoto: string = 'assets/images/default-admin.png'; // mettre une image par défaut dès le début
  selectedPhoto: string | ArrayBuffer | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.adminForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      grade: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('Token manquant');
      this.redirectToLogin();
      return;
    }

    if (idParam && !isNaN(+idParam)) {
      this.adminId = +idParam;
      this.loadAdminData(token);
    } else {
      console.error('ID admin invalide');
      this.redirectToAdminList();
    }
  }

  private loadAdminData(token: string): void {
    this.isLoading = true;
    this.adminService.getAdminById(this.adminId, token).subscribe({
      next: (admin: Administrateur) => {
        this.admin = admin; // ⚡ affecter l'admin ici
        this.adminForm.patchValue({
          username: admin.username,
          email: admin.email,
          grade: admin.grade
        });

        if (admin.image) {
          this.adminPhoto = admin.image;
        } else {
          this.adminPhoto = 'assets/images/default-admin.png';
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'admin:', err);
        this.isLoading = false;
        this.redirectToAdminList();
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.selectedPhoto = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.redirectToLogin();
      return;
    }

    this.isLoading = true;
    const formData = this.prepareFormData();

    this.adminService.updateAdmin(this.adminId, formData, token).subscribe({
      next: (updatedAdmin: Administrateur) => {
        alert('Profil mis à jour avec succès !');
        this.isLoading = false;
        this.admin = updatedAdmin; // mettre à jour admin local
        this.adminPhoto = updatedAdmin.image ? updatedAdmin.image : 'assets/images/default-admin.png';
        this.selectedPhoto = null;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        alert('Une erreur est survenue lors de la mise à jour du profil');
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.redirectToAdminList();
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.adminForm.value;

    Object.keys(formValue).forEach(key => {
      if (formValue[key] !== null && formValue[key] !== undefined) {
        formData.append(key, formValue[key]);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    return formData;
  }

  private markAllAsTouched(): void {
    Object.values(this.adminForm.controls).forEach(control => control.markAsTouched());
  }

  private redirectToLogin(): void {
    window.location.href = '/login';
  }

  private redirectToAdminList(): void {
    window.location.href = '/admin';
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Administrateur } from '../models/administrateur';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './edit-profile-admin.component.html',
  styleUrls: ['./edit-profile-admin.component.scss']
})
export class EditProfileAdminComponent implements OnInit {
  adminForm: FormGroup;
  selectedFile: File | null = null;
  adminId!: number;
  admin!: Administrateur;
  adminPhoto: string = 'assets/images/default-admin.png';
  selectedPhoto: string | ArrayBuffer | null = null;
  isLoading = false;
  // Gestion de la visibilité des mots de passe
  showOldPassword = false;
  showNewPassword = false;
  showCurrentPassword = false;
  personalInfoOpen = true;
securityOpen = true;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.adminForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      grade: ['', Validators.required],
      oldPassword: [''],
      newPassword: ['', [Validators.minLength(6)]],
      currentPassword: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('Token manquant');
      this.redirectToLogin();
      return;
    }

    if (idParam && !isNaN(+idParam)) {
      this.adminId = +idParam;
      this.loadAdminData(token);
    } else {
      console.error('ID admin invalide');
      this.redirectToAdminList();
    }
  }

  private loadAdminData(token: string): void {
    this.isLoading = true;
    this.adminService.getAdminById(this.adminId, token).subscribe({
      next: (admin: Administrateur) => {
        this.admin = admin;
        this.adminForm.patchValue({
          username: admin.username,
          email: admin.email,
          grade: admin.grade
        });

        if (admin.image) {
          this.adminPhoto = admin.image;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'admin:', err);
        this.isLoading = false;
        this.redirectToAdminList();
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Vérification de la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La taille du fichier ne doit pas dépasser 2MB');
        return;
      }
      
      // Vérification du type de fichier
      if (!file.type.match('image.*')) {
        alert('Seuls les fichiers images sont acceptés');
        return;
      }
      
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.selectedPhoto = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateField(field: string): void {
    if (this.adminForm.get(field)?.valid) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        this.redirectToLogin();
        return;
      }

      const value = this.adminForm.get(field)?.value;
      const data = new FormData();
      data.append(field, value);
      data.append('currentPassword', this.adminForm.get('currentPassword')?.value);

      this.isLoading = true;
      this.adminService.updateAdmin(this.adminId, data, token).subscribe({
        next: (updatedAdmin: Administrateur) => {
          this.admin = updatedAdmin;
          this.isLoading = false;
          alert(`${field} mis à jour avec succès !`);
          this.adminForm.get('currentPassword')?.reset();
        },
        error: (err) => {
          console.error(`Erreur lors de la mise à jour de ${field}:`, err);
          this.isLoading = false;
          alert(`Une erreur est survenue lors de la mise à jour de ${field}`);
        }
      });
    }
  }

  updatePassword(): void {
    if (this.adminForm.get('oldPassword')?.valid && 
        this.adminForm.get('newPassword')?.valid) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        this.redirectToLogin();
        return;
      }
  
      const data = new FormData();
      data.append('oldPassword', this.adminForm.get('oldPassword')?.value);
      data.append('newPassword', this.adminForm.get('newPassword')?.value);
  
      this.isLoading = true;
      this.adminService.updateAdminPassword(this.adminId, data, token).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Mot de passe mis à jour avec succès !');
          this.adminForm.get('oldPassword')?.reset();
          this.adminForm.get('newPassword')?.reset();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erreur lors de la mise à jour du mot de passe:', err);
  
          // Vérifier le contenu de l'erreur
          if (err.error && typeof err.error === 'string') {
            if (err.error.includes('ancien mot de passe est incorrect')) {
              alert('Ancien mot de passe incorrect. Veuillez réessayer.');
            } else {
              alert('Erreur: ' + err.error);
            }
          } else {
            alert('Une erreur est survenue lors de la mise à jour du mot de passe.');
          }
        }
      });
    }
  }
  

  updateAll(): void {
    if (this.adminForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.redirectToLogin();
      return;
    }

    this.isLoading = true;
    const formData = this.prepareFormData();

    this.adminService.updateAdmin(this.adminId, formData, token).subscribe({
      next: (updatedAdmin: Administrateur) => {
        this.admin = updatedAdmin;
        this.isLoading = false;
        this.adminPhoto = updatedAdmin.image ? updatedAdmin.image : 'assets/images/default-admin.png';
        this.selectedPhoto = null;
        alert('Profil mis à jour avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        this.isLoading = false;
        alert('Une erreur est survenue lors de la mise à jour du profil');
      }
    });
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.adminForm.value;

    Object.keys(formValue).forEach(key => {
      if (formValue[key] !== null && formValue[key] !== undefined && formValue[key] !== '') {
        formData.append(key, formValue[key]);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    return formData;
  }

  private markAllAsTouched(): void {
    Object.values(this.adminForm.controls).forEach(control => control.markAsTouched());
  }

  cancel(): void {
    this.redirectToAdminList();
  }

  private redirectToLogin(): void {
    window.location.href = '/login';
  }

  private redirectToAdminList(): void {
    window.location.href = '/admin';
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
  
    // Appel à la méthode updateAdminPhoto de ton service
    this.adminService.updateAdminPhoto(this.adminId, this.selectedFile, token).subscribe({
      next: (updatedAdmin: Administrateur) => {
        this.admin = updatedAdmin;
        this.adminPhoto = updatedAdmin.image ? updatedAdmin.image : 'assets/images/default-admin.png';
        this.selectedFile = null;
        this.isLoading = false;
        alert('Photo mise à jour avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la photo:', err);
        this.isLoading = false;
        alert('Une erreur est survenue lors de la mise à jour de la photo.');
      }
    });
  }
  
}
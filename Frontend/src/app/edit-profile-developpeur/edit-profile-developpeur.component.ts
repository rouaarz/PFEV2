/*
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloppeurService } from '../services/developpeur.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-developpeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile-developpeur.component.html',
  styleUrls: ['./edit-profile-developpeur.component.scss']
})
export class EditProfileDeveloppeurComponent implements OnInit {
  profileForm: FormGroup;
  technologiesOptions: string[] = [];
  isLoading = false;
  userId!: number;
  selectedPhoto: string | null = null;
  devPhoto = 'assets/images/default-profile.png';
  showOldPassword = false;
  showNewPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private developpeurService: DeveloppeurService
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', Validators.required],
      technologies: [[], Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      score: [{ value: 0, disabled: true }],
      oldPassword: [''],
      newPassword: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  const storedId = localStorage.getItem('developpeurId');
  if (storedId && !isNaN(+storedId)) {
    this.userId = +storedId;
    this.loadProfile();
  } else {
    this.showAlert('error', 'Impossible de charger le profil : ID invalide');
    this.router.navigate(['/login']);
  }
}


  private showAlert(type: 'success'|'error', message: string): void {
    // Vous pouvez remplacer ceci par ToastrService ou autre système de notifications
    alert(`${type.toUpperCase()}: ${message}`);
  }

  loadProfile(): void {
    this.isLoading = true;
    this.developpeurService.getDeveloppeurProfile(this.userId).subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          username: profile.username,
          email: profile.email,
          specialite: profile.specialite,
          technologies: profile.technologies || [],
          experience: profile.experience || 0,
          score: profile.score || 0
        });
        
        if (profile.image) {
          this.devPhoto = profile.image;
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showAlert('error', 'Erreur lors du chargement du profil');
        console.error('Error loading profile:', error);
      }
    });
  }

  

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const formData = this.profileForm.getRawValue();
      delete formData.oldPassword;
      delete formData.newPassword;
      
      this.developpeurService.updateDeveloppeurProfile(this.userId, formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.showAlert('success', 'Profil mis à jour avec succès');
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.isLoading = false;
          this.showAlert('error', 'Erreur lors de la mise à jour du profil');
          console.error('Error updating profile:', error);
        }
      });
    } else {
      this.showAlert('error', 'Veuillez corriger les erreurs dans le formulaire');
    }
  }

  updatePassword(): void {
    const oldPassword = this.profileForm.get('oldPassword')?.value;
    const newPassword = this.profileForm.get('newPassword')?.value;
    
    if (!oldPassword) {
      this.showAlert('error', 'Veuillez entrer votre mot de passe actuel');
      return;
    }
    
    if (!newPassword || this.profileForm.get('newPassword')?.invalid) {
      this.showAlert('error', 'Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    this.isLoading = true;
    this.developpeurService.updatePassword(this.userId, oldPassword, newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.profileForm.get('oldPassword')?.reset();
        this.profileForm.get('newPassword')?.reset();
        this.showAlert('success', 'Mot de passe mis à jour avec succès');
      },
      error: (error) => {
        this.isLoading = false;
        const errorMsg = error.status === 401 
          ? 'Mot de passe actuel incorrect' 
          : 'Erreur lors de la mise à jour du mot de passe';
        this.showAlert('error', errorMsg);
        console.error('Error updating password:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Vérification de la taille du fichier (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      this.showAlert('error', 'La taille de l\'image ne doit pas dépasser 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedPhoto = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  updatePhoto(): void {
    if (!this.selectedPhoto) {
      this.showAlert('error', 'Veuillez sélectionner une image');
      return;
    }

    this.isLoading = true;
    const file = this.dataURLtoFile(this.selectedPhoto, 'profile.jpg');
    
    this.developpeurService.updatePhoto(this.userId, file).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.devPhoto = this.selectedPhoto!;
        this.selectedPhoto = null;
        this.showAlert('success', 'Photo de profil mise à jour avec succès');
      },
      error: (error) => {
        this.isLoading = false;
        this.showAlert('error', 'Erreur lors de la mise à jour de la photo');
        console.error('Error updating photo:', error);
      }
    });
  }

  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  }

  cancel(): void {
    if (this.profileForm.dirty) {
      if (confirm('Voulez-vous vraiment annuler les modifications non enregistrées ?')) {
        this.router.navigate(['/profile']);
      }
    } else {
      this.router.navigate(['/profile']);
    }
  }
}*/

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloppeurService } from '../services/developpeur.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-developpeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile-developpeur.component.html',
  styleUrls: ['./edit-profile-developpeur.component.scss']
})
export class EditProfileDeveloppeurComponent implements OnInit {


  profileForm: FormGroup;
  technologiesOptions: string[] = ['Java', 'Angular', 'Spring Boot', 'Python', 'Node.js'];
  isLoading = false;
  userId!: number;
  selectedPhoto: string | null = null;
  uploadedFile: File | null = null;
  devPhoto = 'assets/images/default-profile.png';
  showOldPassword = false;
  showNewPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private developpeurService: DeveloppeurService
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', Validators.required],
      technologies: [[], Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      score: [{ value: 0, disabled: true }],
      oldPassword: [''],
      newPassword: ['', [
    Validators.required,
    Validators.minLength(8),
    this.passwordComplexityValidator()
  ]]

    });
  }

  ngOnInit(): void {
  const storedId = localStorage.getItem('developpeurId');
  if (storedId && !isNaN(+storedId)) {
    this.userId = +storedId;
    this.loadProfile();
    this.loadPhoto(); // Ajout nécessaire
  } else {
    this.showAlert('error', 'Impossible de charger le profil : ID invalide');
    this.router.navigate(['/login']);
  }
}


  private showAlert(type: 'success' | 'error', message: string): void {
    alert(`${type.toUpperCase()}: ${message}`);
  }

  loadProfile(): void {
    this.isLoading = true;
    this.developpeurService.getDeveloppeurProfile(this.userId).subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          username: profile.username,
          email: profile.email,
          specialite: profile.specialite,
          technologies: profile.technologies || [],
          experience: profile.experience || 0,
          score: profile.score || 0
           
        });

        if (profile.image) {
          this.devPhoto = profile.image;
           this.loadPhoto();
        }

        this.isLoading = false;
        
      },
      error: () => {
        this.isLoading = false;
        this.showAlert('error', 'Erreur lors du chargement du profil');
      }
    });
  }

onSubmit(): void {
  if (this.profileForm.invalid) return;

  const updatedProfile = { ...this.profileForm.getRawValue(), id: this.userId };
  this.isLoading = true;

  this.developpeurService.updateDeveloppeurProfile(this.userId, updatedProfile).subscribe({
    next: () => {
      this.isLoading = false;
      this.showAlert('success', 'Profil mis à jour avec succès');
      this.loadProfile();
    },
    error: () => {
      this.isLoading = false;
      this.showAlert('error', 'Erreur lors de la mise à jour du profil');
    }
  });
}
updatePassword(): void {
  const oldPassword = this.profileForm.get('oldPassword')?.value;
  const newPassword = this.profileForm.get('newPassword')?.value;

  if (!oldPassword || !newPassword) return;

  this.isLoading = true;

  this.developpeurService.updatePassword(this.userId, oldPassword, newPassword).subscribe({
    next: () => {
      this.isLoading = false;
      this.showAlert('success', 'Mot de passe mis à jour avec succès');
      this.profileForm.patchValue({ oldPassword: '', newPassword: '' });
      this.loadProfile();
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Erreur lors du changement de mot de passe :', err);

      if (err.error && typeof err.error === 'string') {
        if (err.error.includes('ancien mot de passe est incorrect')) {
          this.showAlert('error', 'Ancien mot de passe incorrect. Veuillez réessayer.');
        } else {
          this.showAlert('error', 'Erreur : ' + err.error);
        }
      } else {
        this.showAlert('error', 'Une erreur est survenue lors du changement de mot de passe.');
      }
    }
  });
}
hasTechnologies(): boolean {
  const techs = this.profileForm.get('technologies')?.value;
  return techs && techs.length > 0;
}

getTechNames(): string {
  const techs = this.profileForm.get('technologies')?.value;
  return techs ? techs.join(', ') : 'Aucune technologie sélectionnée';
}

  redirectToLogin() {
    throw new Error('Method not implemented.');
  }

loadPhoto(): void {
  this.developpeurService.getPhoto(this.userId).subscribe({
    next: (blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.devPhoto = reader.result as string;
      };
      reader.readAsDataURL(blob);
    },
    error: () => {
      this.devPhoto==null;
      console.error('Erreur lors du chargement de la photo');
    }
  });
}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 2 * 1024 * 1024) {
        this.showAlert('error', 'Le fichier dépasse la taille maximale de 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadedFile = file;
    }
  }

 updatePhoto(): void {
  if (!this.uploadedFile) return;

  this.isLoading = true;

  this.developpeurService.updatePhoto(this.userId, this.uploadedFile).subscribe({
    next: () => {
      this.isLoading = false;
      this.devPhoto = this.selectedPhoto!;
      this.selectedPhoto = null;
      this.showAlert('success', 'Photo mise à jour avec succès');
      this.loadProfile();
    },
    error: () => {
      this.isLoading = false;
      this.showAlert('error', 'Erreur lors de l\'upload de la photo');
    }
  });
}



  cancel(): void {
    this.router.navigate(['/developpeur/dashboard']);
  }
  updateAll(): void {
  if (this.profileForm.invalid) {
    this.showAlert('error', 'Formulaire invalide');
    return;
  }

  const updatedProfile = {...this.profileForm.getRawValue(), id: this.userId};

  this.isLoading = true;
  this.developpeurService.updateDeveloppeurProfile(this.userId, updatedProfile).subscribe({
    next: () => {
      this.isLoading = false;
      this.showAlert('success', 'Tous les champs ont été mis à jour avec succès');
      this.loadProfile();
    },
    error: () => {
      this.isLoading = false;
      this.showAlert('error', 'Erreur lors de la mise à jour globale du profil');
    }
  });
}

updateField(field: string): void {
  if (this.profileForm.get(field)?.valid) {
    const token = localStorage.getItem('accessToken');  // ou adapte selon ta gestion token
    if (!token) {
      this.showAlert('error', 'Vous devez être connecté');
      this.router.navigate(['/login']);
      return;
    }

    const value = this.profileForm.get(field)?.value;
    const oldPassword = this.profileForm.get('oldPassword')?.value;

    const data = new FormData();
    
    // Pour les champs multi-valeurs comme 'technologies', on stringify
    if (field === 'technologies' && Array.isArray(value)) {
      data.append(field, JSON.stringify(value));
    } else {
      data.append(field, value);
    }
    
    // On envoie l'ancien mot de passe pour la vérification (si nécessaire)
    data.append('oldPassword', oldPassword || '');

    this.isLoading = true;

    this.developpeurService.updateDeveloppeur(this.userId, data, token).subscribe({
      next: (updatedDev) => {
        // On met à jour le formulaire avec la nouvelle valeur confirmée
        this.profileForm.patchValue({ [field]: updatedDev[field] });
        this.isLoading = false;
        this.showAlert('success', `${field} mis à jour avec succès !`);
        // On peut reset l'ancien mot de passe après mise à jour réussie
        this.profileForm.get('oldPassword')?.reset();
        this.loadProfile();
      },
      error: (err) => {
        console.error(`Erreur lors de la mise à jour de ${field}:`, err);
        this.isLoading = false;
        this.showAlert('error', `Une erreur est survenue lors de la mise à jour de ${field}`);
      }
    });
  }
}
logout() {
    // Supprimer les infos du localStorage ou sessionStorage
    localStorage.clear(); // ou localStorage.removeItem('token');
    // Rediriger vers la page de login
    this.router.navigate(['/signin']);
  }

  passwordComplexityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const valid = hasUpperCase && hasNumber;

    return !valid ? { passwordComplexity: true } : null;
  };
}


}
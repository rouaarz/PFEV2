import { Component, OnInit } from '@angular/core';
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
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProfile();
    this.loadTechnologies();
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

  loadTechnologies(): void {
    this.developpeurService.getTechnologiesSuggestions().subscribe({
      next: (techs) => {
        this.technologiesOptions = techs;
      },
      error: (error) => {
        this.showAlert('error', 'Erreur lors du chargement des technologies');
        console.error('Error loading technologies:', error);
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
}
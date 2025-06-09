// import { Component, Output, EventEmitter } from '@angular/core';
// import { TestService } from '../../../services/test.service';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms'; // 🔹 Importer FormsModule

// import { MatInputModule } from '@angular/material/input';

// @Component({
//   selector: 'app-basic-info',
//   templateUrl: './basic-info.component.html',
//   styleUrls: ['./basic-info.component.css'],
//   imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],

//   standalone: true,
// })
// export class BasicInfoComponent {
//   @Output() testCreated = new EventEmitter<number>(); // Modifier pour émettre un number
//   test= {
//     titre: '',
//     description: '',
//     duree: null,
//     type: '',
//     limiteTentatives: null,
//     dateCreation: new Date().toISOString(), // Date actuelle par défaut
//     dateExpiration: null
//   };

//   token = localStorage.getItem('accessToken') ?? '';

//   constructor(private testService: TestService) {}

//   createTest() {
//     this.testService.createTest(this.test, this.token).subscribe({
//       next: (response: any) => {
//         const testId = response.id; // Récupérer l'ID du test
//         console.log('Test créé avec succès:', response); // Affichage de la réponse dans la console
//         this.testCreated.emit(testId); // Émettre l'ID du test
//         alert('Test créé avec succès!'); // Alerte pour l'utilisateur
//       },
//       error: (err) => {
//         console.error('Erreur lors de la création du test:', err); // Affichage erreur dans la console
//         alert('Erreur lors de la création du test'); // Alerte en cas d'erreur
//       }
//     });
//   }

// }
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Test } from '../../../models/Test';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  standalone: true,
})
export class BasicInfoComponent {
  @Input() testId: number | null = null;
  @Output() testCreated = new EventEmitter<number>();

  test: Test = {
    id: undefined,
    titre: '',
    description: '',
    duree: 0,
    type: '',
    accesPublic: false,
    limiteTentatives: 0,
    statut: '',
    niveauDifficulte: '',
    nbQuestions: 0,
    dateCreation: new Date().toISOString(),
    dateExpiration: null,
    createur: { id: 0, username: '' },
    testQuestions: [],
    version: 0,
    technologies: null
  };

  token = localStorage.getItem('accessToken') ?? '';

  // 🔽 Liste des options de technologies disponibles
  techOptions: string[] = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 
  'PHP', 'SQL',  'Kotlin','React.js', 'Vue.js', 'Angular','HTML','CSS'];

  // 🔽 Stocke les technologies sélectionnées dans le select multiple
  selectedTech: string[] = [];
  newTech: string = '';

  constructor(private testService: TestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const testId = this.route.snapshot.paramMap.get('id');
    if (testId) {
      this.testId = +testId;
      this.testService.getTestById(this.testId).subscribe({
        next: (data) => {
          this.test = data;

          // 🔽 Initialiser les technologies sélectionnées à partir du test existant
          this.selectedTech = this.test.technologies || [];
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du test:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de récupérer les détails du test.',
          });
        }
      });
    }
  }
// Dans votre composant, ajoutez ces propriétés et méthodes :

// Méthode pour ajouter une nouvelle technologie
addTech() {
  if (this.newTech && !this.techOptions.includes(this.newTech)) {
    // Ajoute la nouvelle technologie aux options disponibles
    this.techOptions.push(this.newTech);
    // Ajoute la nouvelle technologie aux technologies sélectionnées
    this.selectedTech.push(this.newTech);
    // Réinitialise le champ
    this.newTech = '';
  } else if (this.techOptions.includes(this.newTech)) {
    // Si la technologie existe déjà, on l'ajoute juste aux sélectionnées si pas déjà présente
    if (!this.selectedTech.includes(this.newTech)) {
      this.selectedTech.push(this.newTech);
      this.newTech = '';
    }
  }
}

// Méthode pour supprimer une technologie sélectionnée
removeTech(tech: string) {
  this.selectedTech = this.selectedTech.filter(t => t !== tech);
}
  onSubmit() {
    // 🔽 Cloner le test et ajouter les technologies sélectionnées
    const testToSend = { ...this.test };
    testToSend.technologies = this.selectedTech;

    if (!this.testId) {
      delete testToSend.id;
    }

    if (this.testId) {
      this.testService.updateTest(this.testId, testToSend, this.token).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Test modifié avec succès !',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/tests']);
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification du test:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la modification du test.'
          });
        }
      });
    } else {
      this.testService.createTest(testToSend, this.token).subscribe({
        next: (response) => {
          const testId = response.id;
          console.log('Test créé avec succès:', response);
          this.testCreated.emit(testId);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Test créé avec succès !',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création du test:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création du test.'
          });
        }
      });
    }
  }

  getNiveauClass(niveau: string): string {
    switch (niveau) {
      case 'Facile':
        return 'niveau-facile';
      case 'Intermédiaire':
        return 'niveau-intermediaire';
      case 'Difficile':
        return 'niveau-difficile';
      default:
        return '';
    }
  }

}

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
import { Router, ActivatedRoute } from '@angular/router';  // Importation de ActivatedRoute pour extraire l'ID

import { Test } from '../../../models/Test';  // Vérifiez si l'importation est correcte

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  standalone: true,
})
export class BasicInfoComponent {
  @Input() testId: number | null = null; // L'ID du test à modifier
  @Output() testCreated = new EventEmitter<number>(); // Émet l'ID du test créé
  test: Test = {
    id: undefined, // Ne pas définir l'ID pour éviter que ce soit 0
    titre: '',
    description: '',
    duree: 0,  // Remplace `null` par `0` pour correspondre au type `number | null`
    type: '',
    accesPublic: false,
    limiteTentatives: 0,  // Remplace `null` par `0` si c'est un nombre
    statut: '',
    niveauDifficulte: '',
    nbQuestions: 0,
    dateCreation: new Date().toISOString(),
    dateExpiration: null,
    createur: { id: 0, username: '' },
    testQuestions: [],
    version: 0, // ⚡ Ajoute cette ligne si `@Version` est utilisé

  };
  

  token = localStorage.getItem('accessToken') ?? '';

  constructor(private testService: TestService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Si on est en mode modification, récupérer l'ID du test depuis l'URL
    const testId = this.route.snapshot.paramMap.get('id');  // Utilisation de ActivatedRoute
    if (testId) {
      this.testId = +testId;  // Assurez-vous que l'ID est un nombre
      this.testService.getTestById(this.testId).subscribe({
        next: (data) => {
          this.test = data;  // Pré-remplir le formulaire avec les données du test existant
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du test:', err);
          alert('Erreur lors de la récupération du test');
        }
      });
    }
  }

  onSubmit() {
    const testToSend = { ...this.test }; // Créer une copie pour éviter de modifier `this.test`
  
    if (!this.testId) {
      delete testToSend.id; // Supprimer l'ID pour éviter d'envoyer `0`
    }
  
    if (this.testId) {
      this.testService.updateTest(this.testId, testToSend, this.token).subscribe({
        next: () => {
          alert('Test modifié avec succès!');
          this.router.navigate(['/tests']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification du test:', err);
          alert('Erreur lors de la modification du test');
        }
      });
    } else {
      this.testService.createTest(testToSend, this.token).subscribe({
        next: (response) => {
          const testId = response.id;
          console.log('Test créé avec succès:', response);
          this.testCreated.emit(testId);
          alert('Test créé avec succès!');
        },
        error: (err) => {
          console.error('Erreur lors de la création du test:', err);
          alert('Erreur lors de la création du test');
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

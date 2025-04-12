import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../../services/invitation.service';
import { InvitationTest } from '../../models/InvitationTest';
import { CommonModule } from '@angular/common';  // Assure-toi que ce module est importé

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
  imports: [
    CommonModule ],
    standalone: true,
  })
// export class InvitationComponent implements OnInit {
//   invitationId!: number;
//   invitationDetails!: InvitationTest;
//   isLoading: boolean = false;  // Variable pour l'état de chargement

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private invitationService: InvitationService
//   ) {}

//   ngOnInit(): void {
//     // Assure-toi que tu récupères bien l'ID
//     this.invitationId = +this.route.snapshot.paramMap.get('invitationId')!;
//     console.log("ID de l'invitation : ", this.invitationId); // Ajoute un log pour vérifier
//     this.getInvitationDetails();
//   }
  

//   getInvitationDetails(): void {
//     this.isLoading = true; // Active le loader avant l'appel API
//     this.invitationService.getInvitationDetails(this.invitationId).subscribe(
//       (invitation) => {
//         this.invitationDetails = invitation;
//         this.isLoading = false; // Désactive le loader après récupération
  
//         // Vérification du statut de l'invitation
//         if (this.invitationDetails.statut === 'DECLINED' || this.invitationDetails.statut === 'ACCEPTED') {
//           console.log("Invitation déjà traitée :", this.invitationDetails.statut);
//         }
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération de l\'invitation', error);
//         alert('Erreur lors de la récupération des détails');
//         this.isLoading = false;
//       }
//     );
//   }
  

//   onAccept() {
//     this.invitationService.respondToInvitation(this.invitationId, true).subscribe(
//       (response) => {
//         alert(response);
//         this.getInvitationDetails(); // Rafraîchir les détails après acceptation
//       },
//       (error) => {
//         alert('Erreur lors de l\'acceptation de l\'invitation');
//       }
//     );
//   }
  
//   onDecline() {
//     this.invitationService.respondToInvitation(this.invitationId, false).subscribe(
//       (response) => {
//         alert(response);
//         this.getInvitationDetails(); // Rafraîchir les détails après refus
//       },
//       (error) => {
//         alert('Erreur lors du refus de l\'invitation');
//       }
//     );
//   }
  
//   }
export class InvitationComponent implements OnInit {
  invitationId!: number;
  invitationDetails!: InvitationTest;
  isLoading: boolean = false;  // Loader principal (chargement initial)
  isProcessing: boolean = false;  // Loader pour le bouton

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    this.invitationId = +this.route.snapshot.paramMap.get('invitationId')!;
    console.log("ID de l'invitation : ", this.invitationId);
    this.getInvitationDetails();
  }

  getInvitationDetails(): void {
    this.isLoading = true;
    this.invitationService.getInvitationDetails(this.invitationId).subscribe(
      (invitation) => {
        this.invitationDetails = invitation;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'invitation', error);
        alert('Erreur lors de la récupération des détails');
        this.isLoading = false;
      }
    );
  }

  onAccept() {
    this.isProcessing = true; // Active le loader du bouton
    this.invitationService.respondToInvitation(this.invitationId, true).subscribe(
      (response) => {
        alert('Invitation  acceptée !');
        this.getInvitationDetails(); // Mettre à jour les détails
        this.isProcessing = false; // Désactive le loader
          // Vérifie si l'invitation contient un test et redirige
      if (this.invitationDetails && this.invitationDetails.test) {
        const testId = this.invitationDetails.test.id;
        this.router.navigate([`/test/${testId}/questions`]);
      }
      },
      (error) => {
        alert('Erreur lors de l\'acceptation de l\'invitation');
        this.isProcessing = false;
      }
    );
  }

  onDecline() {
    this.isProcessing = true;
    this.invitationService.respondToInvitation(this.invitationId, false).subscribe(
      (response) => {
        alert('Invitation réfusée !');
        this.getInvitationDetails();
        this.isProcessing = false;
        this.router.navigate(['/']);  // Remplace '/home' par la route de ta page

      },
      (error) => {
        alert('Erreur lors du refus de l\'invitation');
        this.isProcessing = false;
      }
    );
  }
}

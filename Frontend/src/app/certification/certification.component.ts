import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Certification } from '../models/certification';
import { CertifService } from '../services/certif.service';

@Component({
  selector: 'app-certification',
  standalone:true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css'
})
 export class  CertificationComponent implements OnInit {


  certifications: Certification[] = [];

  constructor(private certifService: CertifService) {}

 ngOnInit(): void {
    const storedDevId = localStorage.getItem('developpeurId');

    if (storedDevId) {
      const developpeurId = Number(storedDevId); // ✅ conversion explicite

      this.certifService.getCertificationsByDeveloppeurId(developpeurId)
        .subscribe((data) => {
          this.certifications = data;
        }, (error) => {
          console.error("Erreur lors du chargement des certifications :", error);
        });
    } else {
      console.warn("Aucun ID de développeur trouvé dans le localStorage.");
    }
  }

  downloadCertification(certif: Certification) {
  this.certifService.downloadCertification(certif.id).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certification-${certif.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, error => {
    console.error("Erreur lors du téléchargement :", error);
  });
}

shareCertification(certif: Certification): void {
  this.certifService.shareCertification(certif.id).subscribe({
    next: (url: string) => {
      if (navigator.share) {
        navigator.share({
          title: 'Mon Certificat',
          text: 'Voici ma certification !',
          url: url,
        }).catch(err => {
          console.error("Erreur de partage :", err);
          alert("Le partage a échoué.");
        });
      } else {
        // Fallback : copie du lien dans le presse-papiers
        navigator.clipboard.writeText(url)
          .then(() => alert("Lien copié dans le presse-papier : " + url))
          .catch(() => alert("Impossible de copier le lien."));
      }
    },
    error: (err) => {
      console.error("Erreur lors de la récupération de l'URL du certificat :", err);
      alert("Impossible de générer le lien de certification.");
    }
  });
}



}
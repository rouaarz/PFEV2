import { Component, OnInit } from '@angular/core';
import { TestStatsResponse } from '../models/TestStatsResponse ';
import { DeveloppeurResultResponse } from '../models/DeveloppeurResultResponse ';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { TestService } from '../services/test.service';
import { ReviewTestComponent } from '../components/review/review-test-component/review-test-component.component'
import { CommonModule } from '@angular/common';  // Assure-toi que ce module est importé
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DeveloppeurResponse } from '../models/DeveloppeurResponse ';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-test-statistiques',
  templateUrl: './test-statistiques.component.html',
  styleUrls: ['./test-statistiques.component.css'],
  imports: [
    CommonModule, BaseChartDirective, NgxPaginationModule,FormsModule],
  standalone: true
})

export class TestStatistiquesComponent implements OnInit {
  testId!: number;
  stats?: TestStatsResponse;
  resultats: DeveloppeurResultResponse[] = [];
  testDetails: any;
  showGraph = false;
  showModal = false;
  token = localStorage.getItem('accessToken') ?? '';
  searchTerm: string = '';
  selectedTentative: string = '';
  resultatsFiltres: DeveloppeurResultResponse[] = []; // résultats filtrés

  p: number = 1;
  itemsPerPage: number = 3;
  reponses: DeveloppeurResponse[] = [];
  tentativesDisponibles: number[] = [];

  selectedDevNom = '';
  scoreTotal = 0;
  tentativeNumber = '';
  tempsTotal = '';
  datePassage = new Date();
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Réussites', 'Échecs'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#F44336'], // vert / rouge
        hoverBackgroundColor: ['#66BB6A', '#EF5350']
      }
    ]
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Score des développeurs',
      backgroundColor: '#42a5f5',
      borderRadius: 5
    }]
  };

  constructor(
    private route: ActivatedRoute,
    private scoreService: ScoreService,
    private testService: TestService,
    private http: HttpClient

  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.testId = +this.route.snapshot.paramMap.get('id')!;

    this.scoreService.getStats(this.testId).subscribe(data => this.stats = data);
    this.testService.getTestDetails(this.testId).subscribe(data => {
      this.testDetails = data;
      console.log('Détails du test:', this.testDetails);

      // Générer la liste des tentatives [1, 2, ..., N]
      const nbTentatives = this.testDetails.limiteTentatives;

      console.log(nbTentatives)
      this.tentativesDisponibles = Array.from({ length: nbTentatives }, (_, i) => i + 1);
    });
    this.scoreService.getResultats(this.testId).subscribe(data => {
      this.resultats = data;
      this.resultatsFiltres = [...this.resultats];
      this.updateChart();
    });


  }
  applyFilters() {
    this.resultatsFiltres = this.resultats.filter(res => {
      const matchTentative = this.selectedTentative === '' || res.tentative.toString() === this.selectedTentative;
      const matchSearch = this.searchTerm.trim() === '' ||
        res.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        res.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchTentative && matchSearch;
        this.updateFilteredChart(); // utilise les données filtrées pour le graphique

    });

    this.updateChart(); // met à jour les graphiques selon les filtres
  }
exportModalPDF() {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  let y = 25;

  // Fonction pour entête sur chaque page
  const header = () => {
    doc.setFontSize(14);
    doc.setTextColor('#34495e');
    doc.text('Centre Nationale Informatique', pageWidth / 2, 15, { align: 'center' });
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, 18, pageWidth - margin, 18);
  };

  // Fonction pour pied de page avec numéro de page
  const footer = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor('#999999');
      doc.text(`Page ${i} / ${pageCount}`, pageWidth / 2, 290, { align: 'center' });
    }
  };

  // Première page entête
  header();

  // Titres centrés
  doc.setFontSize(16);
  doc.setTextColor('#2c3e50');
  doc.text(`Détails des résultats - ${this.selectedDevNom}`, pageWidth / 2, y, { align: 'center' });
  y += 10;
  doc.setFontSize(14);
  doc.text(`${this.testDetails.titre} - ${this.scoreTotal}% (${this.tentativeNumber}ᵉ tentative)`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  doc.setFontSize(12);
  doc.setTextColor('#34495e');
  doc.text(`Temps total : ${this.tempsTotal}`, margin, y);
  y += 7;
  doc.text(`Date : ${new Date(this.datePassage).toLocaleString()}`, margin, y);
  y += 15;

  doc.setFontSize(14);
  doc.setTextColor('#2c3e50');
  doc.text('Questions :', margin, y);
  y += 10;

  this.reponses.forEach((rep: any, index: number) => {
    // Enonce question en gras
    doc.setFontSize(12);
    doc.setTextColor('#2c3e50');
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${rep.question.enonce}`, margin, y);
    y += 8;

    // Réponse texte normal, couleur selon correct ou incorrect
    doc.setFont('helvetica', 'normal');
    if (rep.isCorrect) {
      doc.setTextColor('#27ae60'); // vert
    } else {
      doc.setTextColor('#e74c3c'); // rouge
    }
    doc.text('Réponse :', margin + 5, y);
    y += 7;

    if (rep.reponseLibre) {
      doc.text(rep.reponseLibre, margin + 10, y);
      y += 7;
    }

    if (rep.selectedAnswerOptions?.length) {
      rep.selectedAnswerOptions.forEach((opt: any) => {
        doc.text(`- ${opt.text}`, margin + 10, y);
        y += 6;
      });
    }

    if (rep.feedback) {
      doc.setTextColor('#34495e');
      doc.text(`Feedback AI: ${rep.feedback}`, margin + 10, y);
      y += 7;
    }

    if (rep.reponseCorrecte) {
      doc.setFont('helvetica', 'italic');
      doc.text('Bonne réponse attendue:', margin + 10, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      const splitText = doc.splitTextToSize(rep.reponseCorrecte, pageWidth - 2 * margin - 20);
      doc.text(splitText, margin + 10, y);
      y += splitText.length * 7;
    }

    y += 12;

    // Gestion saut page si trop bas
    if (y > 270) {
      footer();
      doc.addPage();
      y = 25;
      header();
    }
  });

  footer();
  doc.save(`details-${this.selectedDevNom}.pdf`);
}

// exportPDF() {
//   const doc = new jsPDF();
//   let y = 10;

//   // Titre
//   doc.setFontSize(18);
//   doc.text('Statistiques du test', 70, y);
//   y += 10;

//   // Infos générales
//   doc.setFontSize(12);
//   if (this.testDetails) {
//     doc.text(`Titre : ${this.testDetails.titre}`, 10, y);
//     y += 7;
//     doc.text(`Date de création : ${this.testDetails.dateCreation}`, 10, y);
//     y += 7;
//     doc.text(`Nombre de participants : ${this.testDetails.nbQuestions}`, 10, y);
//     y += 7;
//     doc.text(`Durée maximale : ${this.testDetails.duree} minutes`, 10, y);
//     y += 10;
//   }

//   // Graphiques
//   const doughnutCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
//   const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

//   if (barCanvas) {
//     const imgData = barCanvas.toDataURL('image/png');
//     doc.addImage(imgData, 'PNG', 10, y, 90, 60);
//   }

//   if (doughnutCanvas) {
//     const imgData = doughnutCanvas.toDataURL('image/png');
//     doc.addImage(imgData, 'PNG', 110, y, 90, 60);
//   }

//   y += 70;

//   // Tableau des résultats
//   const tableData = this.resultatsFiltres.map(res => [
//     res.nom,
//     res.email,
//     `${res.score} %`,
//     res.tentative,
//     res.temps
//   ]);

//   autoTable(doc, {
//     startY: y,
//     head: [['Nom', 'Email', 'Score', 'Tentative', 'Temps']],
//     body: tableData,
//     theme: 'grid',
//     headStyles: { fillColor: [41, 128, 185] },
//     styles: { fontSize: 10 }
//   });

//   doc.save('statistiques-test.pdf');
// }
exportPDF() {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString();

  let y = 10;

  // ✅ En-tête officielle
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Centre National de l’Informatique', 105, y, { align: 'center' });
  y += 10;

  doc.setFontSize(14);
  doc.text('Statistiques du test', 105, y, { align: 'center' });
  y += 10;

  // ✅ Infos générales
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  if (this.testDetails) {
    doc.text(`Fait à Tunis, le ${today}`, 10, y);
        y += 7;

    doc.text(`Titre : ${this.testDetails.titre}`, 10, y);
    y += 7;
    doc.text(`Date de création : ${this.testDetails.dateCreation}`, 10, y);
    y += 7;
    doc.text(`Nombre de participants : ${this.testDetails.nbQuestions}`, 10, y);
    y += 7;
    doc.text(`Durée maximale : ${this.testDetails.duree} minutes`, 10, y);
    y += 10;
  }

  // ✅ Graphiques
  const doughnutCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
  const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;

  if (barCanvas) {
    const imgData = barCanvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, y, 90, 60);
  }

  if (doughnutCanvas) {
    const imgData = doughnutCanvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 110, y, 90, 60);
  }

  y += 70;

  // ✅ Tableau des résultats
  const tableData = this.resultatsFiltres.map(res => [
    res.nom,
    res.email,
    `${res.score} %`,
    res.tentative,
    res.temps
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Nom', 'Email', 'Score', 'Tentative', 'Temps']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 10 }
  });
  const pageHeight = doc.internal.pageSize.height;

  // Position pour signature
const finalY = (doc as any).lastAutoTable.finalY + 20;
  const signatureY = pageHeight - 15;

  // ✅ Pied de page avec signature
  doc.setFontSize(12);
  doc.text('Signature:', 160, finalY);
  doc.line(140, finalY + 15, 200, finalY + 15); // ligne de signature

  // Sauvegarder le fichier
  doc.save('statistiques-test.pdf');
}

  updateFilteredChart(): void {
    this.barChartData.labels = this.resultatsFiltres.map(r => r.nom);
    this.barChartData.datasets[0].data = this.resultatsFiltres.map(r => r.score);
  }

  updateChart(): void {
    this.barChartData.labels = this.resultats.map(r => r.nom);
    this.barChartData.datasets[0].data = this.resultats.map(r => r.score);
    if (this.stats) {
      this.doughnutChartData.datasets[0].data = [
        this.stats.reussit.total,
        this.stats.echecs.total
      ];
    }

  }

  toggleGraph(): void {
    this.showGraph = !this.showGraph;
  }

  openModal(testId: number, dev: DeveloppeurResultResponse) {
    this.scoreService.getDevReponses(testId, dev.id, this.token).subscribe({
      next: (data) => {
        this.reponses = data;
        this.selectedDevNom = dev.nom;
        this.tentativeNumber = dev.tentative;
        this.tempsTotal = dev.temps;
        this.scoreTotal = dev.score;
        this.showModal = true;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réponses du développeur :', error);
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  print() {
    window.print();
  }

}
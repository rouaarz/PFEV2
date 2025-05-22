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
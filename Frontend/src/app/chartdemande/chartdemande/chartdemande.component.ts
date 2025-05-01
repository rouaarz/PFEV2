/*import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chartdemande',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './chartdemande.component.html',
  styleUrls: ['./chartdemande.component.css']
})
export class ChartdemandeComponent implements OnInit {

  chartData: ChartData<'doughnut'> = {
    labels: ['Facile', 'Moyen', 'Difficile'],
    datasets: [
      {
        data: [], // sera rempli dynamiquement
        label: 'Difficulté des Questions'
      }
    ],
  };

  chartType: ChartType = 'doughnut';

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }


  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.http.get<{ [key: string]: number }>('http://localhost:8083/api/stats/questions-difficulty')
      .subscribe(response => {
        this.chartData.datasets[0].data = [
          response['Facile'],
          response['Moyen'],
          response['Difficile']
        ];
      });
  }
}
*/
/*
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chartdemande',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './chartdemande.component.html',
  styleUrls: ['./chartdemande.component.css']
})
export class ChartdemandeComponent implements OnInit {

  chartData: ChartData<'doughnut'> = {
    labels: ['Facile', 'Moyen', 'Difficile'],
    datasets: [
      {
        data: [],
        label: 'Difficulté des Questions',
        backgroundColor: ['#4FC3F7', '#FFEB3B', '#F44336'], // Bleu clair, jaune, rouge
        hoverOffset: 8
      }
    ]
  };

  chartType: ChartType = 'doughnut';

  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const total = context.chart.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return `${context.label}: ${value} (${percentage})`;
          }
        }
      }
    }
  };

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.http.get<{ [key: string]: number }>('http://localhost:8083/api/stats/questions-difficulty')
      .subscribe(response => {
        this.chartData.datasets[0].data = [
          response['Facile'] || 0,
          response['Moyen'] || 0,
          response['Difficile'] || 0
        ];
      });
  }
}*/
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chartdemande',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, HttpClientModule],
  templateUrl: './chartdemande.component.html',
  styleUrls: ['./chartdemande.component.css']
})
export class ChartdemandeComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string | null = null;

  /*chartData: ChartData<'pie'> = {
    labels: ['Facile', 'Moyen', 'Difficile'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#31a5f3', 
          '#FFC107', // Jaune
          '#F44336'  // Rouge
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };*/
  chartData: ChartData<'pie'> = {
    labels: ['Facile', 'Moyen', 'Difficile'],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgb(95, 202, 7)', // Vert vif
        '#FF9800',           // Orange vif
        '#F44336'            // Rouge vif
      ],
      
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverBackgroundColor: [
        'rgb(95, 202, 7)', // Vert vif
        '#FF9800',           // Orange vif
        '#F44336' // Rouge vif
      ],
      hoverBorderColor: '#ffffff',
      hoverOffset: 15
    }]
  };

  chartType: ChartType = 'pie';

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return `${label}: ${value} (${percentage})`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.http.get<{ [key: string]: number }>('http://localhost:8083/api/stats/questions-difficulty')
      .subscribe({
        next: (response) => {
          this.chartData.datasets[0].data = [
            response['Facile'] || 0,
            response['Moyen'] || 0,
            response['Difficile'] || 0
          ];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des données:', err);
          this.errorMessage = 'Impossible de charger les données. Veuillez réessayer plus tard.';
          this.isLoading = false;
        }
      });
  }
  
}

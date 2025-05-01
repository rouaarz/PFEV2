/*import { Component } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chartsubscribers',
  standalone: true,
  imports: [ CommonModule,BaseChartDirective],
  templateUrl: './chartsubscribers.component.html',
  styleUrls: ['./chartsubscribers.component.css']
})
export class ChartsubscribersComponent {
  constructor() {
    Chart.register(...registerables);
  }
  data: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { data: this.getSubs(), label: 'Subscribers', backgroundColor: 'blue' },
      { data: this.getWatching(), label: 'Visiteur', backgroundColor: 'red' }
    ]
  };
  chartType: ChartType = 'bar';

  getSubs() {
    return [100, 200, 250, 400, 450, 150, 200, 550, 350, 200, 300, 350];
  }

  getWatching() {
    return [100, 150, 120, 200, 230, 400, 180, 136, 145, 250, 150, 300];
  }
}*/
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { StatistiqueService } from '../../services/statistique.service';

@Component({
  selector: 'app-chartsubscribers',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chartsubscribers.component.html',
  styleUrls: ['./chartsubscribers.component.css']
})
export class ChartsubscribersComponent implements OnInit {
  teamStats: any[] = [];
  chart: any;

  constructor(private http: HttpClient,private statistiqueService: StatistiqueService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTeamStats();
  }

  /*loadTeamStats() {
    this.http.get<any[]>('http://localhost:8083/api/stats/team-stats').subscribe(data => {
      this.teamStats = data;
      this.createTeamChart();
    });
  }*/
    loadTeamStats(): void {
      this.statistiqueService.getTeamStats().subscribe(data => {
        // Si la réponse est un objet, on le met dans un tableau
        this.teamStats = Array.isArray(data) ? data : [data];
        this.createTeamChart();
      });
    }
  

  /*createTeamChart() {
    const ctx = document.getElementById('teamChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy();
    }
    

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.teamStats.map(team => team.managerName),
        datasets: [
          {
            label: 'Nombre de développeurs',
            data: this.teamStats.map(team => team.developerCount),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            categoryPercentage: 0.7, // réduire pour diminuer l’espace entre chefs
            barPercentage: 0.7,
            barThickness:undefined
          },
          {
            label: 'Score moyen',
            data: this.teamStats.map(team => team.averageScore),
            backgroundColor: 'rgba(52, 11, 235, 0.7)',
            yAxisID: 'y1',
            categoryPercentage: 0.7, // réduire pour diminuer l’espace entre chefs
            barPercentage: 0.7,
            barThickness: undefined
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Nombre de développeurs' },
          
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            title: { display: true, text: 'Score moyen' },
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }*/
    createTeamChart() {
      const ctx = document.getElementById('teamChart') as HTMLCanvasElement;
    
      if (this.chart) {
        this.chart.destroy();
      }
    
      const isChef = this.teamStats.length === 1;
    
      const categoryPercentage = isChef ? 0.5 : 0.7;
      const barPercentage = isChef ? 0.5 : 0.7;
    
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.teamStats.map(team => team.managerName),
          datasets: [
            {
              label: 'Nombre de développeurs',
              data: this.teamStats.map(team => team.developerCount),
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              categoryPercentage,
              barPercentage,
              barThickness: undefined
            },
            {
              label: 'Score moyen',
              data: this.teamStats.map(team => team.averageScore),
              backgroundColor: 'rgba(52, 11, 235, 0.7)',
              yAxisID: 'y1',
              categoryPercentage,
              barPercentage,
              barThickness: undefined
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Nombre de développeurs' },
            },
            y1: {
              beginAtZero: true,
              position: 'right',
              title: { display: true, text: 'Score moyen' },
              grid: { drawOnChartArea: false }
            }
          }
        }
      });
    }
    
 

  // Conservez vos méthodes existantes si vous en avez besoin
  getSubs() {
    return [100, 200, 250, 400, 450, 150, 200, 550, 350, 200, 300, 350];
  }

  getWatching() {
    return [100, 150, 120, 200, 230, 400, 180, 136, 145, 250, 150, 300];
  }
}

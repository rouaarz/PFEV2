// import { Component, Input, OnInit } from '@angular/core';
// import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-result-graph',
//   templateUrl: './result-graph.component.html',
//   styleUrls: ['./result-graph.component.css'],
//    imports: [BaseChartDirective,
//       CommonModule],
//     standalone: true,
// })
// export class ResultGraphComponent implements OnInit {
//   @Input() results: any[] = [];
//   @Input() currentQuestionId: number = 0;

//   public scatterChartData: ChartConfiguration<'scatter'>['data'] = {
//     datasets: []
//   };

//   public scatterChartOptions: ChartOptions<'scatter'> = {
//     responsive: true,
//     scales: {
//       x: {
//         title: { display: true, text: 'Question' },
//         ticks: {
//           stepSize: 1
//         }
//       },
//       y: {
//         title: { display: true, text: 'Niveau' },
//         ticks: {
//           callback: function (value: any) {
//             const levels = ['FACILE', 'MOYEN', 'DIFFICILE'];
//             return levels[value] || value;
//           }
//         },
//         min: 0,
//         max: 2
//       }
//     },
//     plugins: {
//       legend: { display: false }
//     }
//   };

//   ngOnInit(): void {
//     this.generateChart();
//   }

//   generateChart(): void {
//     const levelMap: any = {
//       'FACILE': 0,
//       'MOYEN': 1,
//       'DIFFICILE': 2
//     };

//     this.scatterChartData.datasets = [{
//       data: this.results.map((r, index) => ({
//         x: index + 1,
//         y: levelMap[r.question.niveau] ?? 0,
//         backgroundColor: r.isCorrect ? 'green' : 'red',
//         questionId: r.question.id
//       })),
//       pointBackgroundColor: this.results.map(r => r.isCorrect ? 'green' : 'red'),
//       pointRadius: this.results.map(r => r.question.id === this.currentQuestionId ? 10 : 5),
//       pointBorderColor: this.results.map(r => r.question.id === this.currentQuestionId ? 'black' : 'transparent'),
//       pointBorderWidth: 2,
//       label: 'Résultat des questions'
//     }];
//   }
// }



// import { Component, Input, OnChanges } from '@angular/core';
// import { ChartConfiguration, ChartOptions } from 'chart.js';
// import { DeveloppeurResponse } from '../../../models/DeveloppeurResponse ';
// import { CommonModule } from '@angular/common';
// import { BaseChartDirective } from 'ng2-charts';

// type Niveau = 'FACILE' | 'INTERMEDIAIRE' | 'DIFFICILE';

// @Component({
//   selector: 'app-result-graph',
//   templateUrl: './result-graph.component.html',
//   styleUrls: ['./result-graph.component.css'],
//   standalone: true,
//   imports: [CommonModule, BaseChartDirective]
// })
// export class ResultGraphComponent implements OnChanges {
//   @Input() reponses: DeveloppeurResponse[] = [];
//   @Input() currentQuestionIndex: number = 0;

//   chartData: ChartConfiguration<'scatter'>['data'] = { datasets: [] };
//   chartOptions: ChartOptions<'scatter'> = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const raw = context.raw as { label: string };
//             return `Q${context.dataIndex + 1} : ${raw.label}`;
//           }
//         }
//       }

//     },
//     scales: {
//       y: {
//         min: 0,
//         max: 2,
//         ticks: {
//           callback: function (value) {
//             return ['🧡 Facile', '💚 Intermédiaire', '💜 Difficile'][value as number];
//           }
//         }
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Questions'
//         }
//       }
//     }
//   };
//   ngOnChanges(): void {
//     console.log(this.reponses); // Vérifiez si les données sont correctes

//     const niveauToY: Record<Niveau, number> = {
//       FACILE: 0,
//       INTERMEDIAIRE: 1,
//       DIFFICILE: 2
//     };

//     const points = this.reponses.map((rep, i) => {
//       const niveauRaw = rep.question?.niveau?.toUpperCase();
//       const niveau = niveauRaw in niveauToY ? niveauRaw as Niveau : 'FACILE'; // fallback

//       return {
//         x: i + 1,
//         y: niveauToY[niveau],
//         backgroundColor: i === this.currentQuestionIndex ? '#ff0000' :
//                         rep.isCorrect ? '#4CAF50' : '#f44336',
//         label: rep.question.enonce ?? 'Question inconnue'
//       };
//     });

//     console.log(points); // Vérifiez si les points sont générés correctement
//     this.chartData = {
//       datasets: [{
//         data: points.map(p => ({
//           x: p.x,
//           y: p.y,
//           label: p.label,
//           backgroundColor: p.backgroundColor
//         })),
//         pointRadius: 8,
//         pointHoverRadius: 10,
//         showLine: false,
//         label: 'Résultats'
//       }]
//     };

//   }


// }
import { Component, Input, OnChanges } from '@angular/core'; 
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { DeveloppeurResponse } from '../../../models/DeveloppeurResponse ';

@Component({
  selector: 'app-result-graph',
  templateUrl: './result-graph.component.html',
  styleUrls: ['./result-graph.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
})
export class ResultGraphComponent implements OnChanges {
  @Input() results: DeveloppeurResponse[] = [];

  correctCount = 0;
  incorrectCount = 0;

  chartType: ChartType = 'bar';

  chartData: ChartData<'bar'> = {
    labels: ['Correctes', 'Incorrectes'],
    datasets: [
      {
        label: 'Résultats',
        data: [0, 0],
        backgroundColor: ['#4CAF50', '#F44336'],
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  ngOnChanges(): void {
    console.log('📊 [ngOnChanges] Résultats reçus :', this.results);

    this.correctCount = this.results.filter(r => r.isCorrect).length;
    this.incorrectCount = this.results.length - this.correctCount;

    console.log('✅ Nombre de bonnes réponses :', this.correctCount);
    console.log('❌ Nombre de mauvaises réponses :', this.incorrectCount);

    this.chartData.datasets[0].data = [this.correctCount, this.incorrectCount];

    console.log('🧾 chartData mis à jour :', this.chartData);
  }
}

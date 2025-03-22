import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chartdemande',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './chartdemande.component.html',
  styleUrls: ['./chartdemande.component.css']
})
export class ChartdemandeComponent {

   constructor() {
      Chart.register(...registerables); 
    }
  chartData: ChartData<'doughnut'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27], label: 'Series B' },
    ],
  };
  chartType: ChartType = 'doughnut';
}

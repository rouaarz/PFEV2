import { Component } from '@angular/core';
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
}

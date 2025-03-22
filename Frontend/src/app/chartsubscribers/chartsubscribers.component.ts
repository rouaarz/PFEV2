import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartData } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chartsubscribers',
  standalone: true,
  imports: [ BaseChartDirective ,CommonModule],
  templateUrl: './chartsubscribers.component.html',
  styleUrl: './chartsubscribers.component.css'
})
export class ChartsubscribersComponent {
  data: ChartData<'bar'>= {
    labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets:[{data:this.getSubs(), label:'Subscribers'},
    {data:this.getWatching(), label:'visiteur'}]
  };
  getSubs(){
    return[100,200,250,400,450,150,200,550,350,200,300,350];

  }
  getWatching(){
    return[100,150,120,200,230,400,180,136,145,250,150,300]
  }


}

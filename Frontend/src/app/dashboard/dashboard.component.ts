// import { Component } from '@angular/core';
// import { NavbarCompComponent } from "../Layout/navbar-comp/navbar-comp.component";
// import { SideBarCompComponent } from "../Layout/side-bar-comp/side-bar-comp.component";
// import { ChartdemandeComponent } from "../chartdemande/chartdemande/chartdemande.component";
// import { ChartsubscribersComponent } from "../chartsubscribers/chartsubscribers/chartsubscribers.component";
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss'],
//   standalone: true,

//   imports: [NavbarCompComponent,  CommonModule, SideBarCompComponent, ChartdemandeComponent, ChartsubscribersComponent]
// })
// export class DashboardComponent {

// }
import { Component } from '@angular/core';
import { NavbarCompComponent } from "../Layout/navbar-comp/navbar-comp.component";
import { SideBarCompComponent } from "../Layout/side-bar-comp/side-bar-comp.component";
import { ChartdemandeComponent } from "../chartdemande/chartdemande/chartdemande.component";
import { ChartsubscribersComponent } from "../chartsubscribers/chartsubscribers/chartsubscribers.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [NavbarCompComponent, CommonModule, SideBarCompComponent, ChartdemandeComponent, ChartsubscribersComponent]
})
export class DashboardComponent {
  // Define the 'number' property and initialize it with a sample value
  number: number = 0;

  constructor() {
    // You can update this value dynamically if needed
    this.fetchData();
  }

  fetchData() {
    // Simulate fetching some data (you can replace this with actual API calls)
    this.number = 100;  // Set to the actual data value
  }
}

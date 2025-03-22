import { Component } from '@angular/core';
import { NavbarCompComponent } from "../Layout/navbar-comp/navbar-comp.component";
import { SideBarCompComponent } from "../Layout/side-bar-comp/side-bar-comp.component";
import { ChartdemandeComponent } from "../chartdemande/chartdemande/chartdemande.component";
import { ChartsubscribersComponent } from "../chartsubscribers/chartsubscribers/chartsubscribers.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [NavbarCompComponent, SideBarCompComponent, ChartdemandeComponent, ChartsubscribersComponent]
})
export class DashboardComponent {

}

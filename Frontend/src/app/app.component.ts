import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true, 

})
export class AppComponent {
  isDashboardPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isDashboardPage = this.router.url.includes('/dash');
    });
  }
  

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
  title = 'FrontendFinal';
}

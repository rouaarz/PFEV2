import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
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

  title = 'FrontendFinal';

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  shouldShowNavbar(): boolean {
    const hiddenRoutes = [
      '/signin',
      '/signup',
      '/forgot-password',
      '/Confirmationemail',
      '/reset-password',
      '/editDev',
    ];

    // Vérifie les routes simples
    const isHiddenStatic = hiddenRoutes.some(route => this.router.url.includes(route));

    // Vérifie la route dynamique "/test/:testId/questions"
    const isTestQuestionsRoute = /^\/test\/\d+\/questions$/.test(this.router.url);

    return !isHiddenStatic && !isTestQuestionsRoute;
  }
}

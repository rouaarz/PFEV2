import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar-comp',
  standalone: true,
  templateUrl: './side-bar-comp.component.html',
  styleUrls: ['./side-bar-comp.component.scss'],
  imports: [MatIconModule, MatButtonModule, MatSidenavModule,CommonModule,RouterModule]
})
export class SideBarCompComponent implements OnInit {
  OpenedSideBar: boolean = true;
  current!: string;
  private router = inject(Router);
  questionsMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.current = this.router.url;
    console.log(this.current);

    this.router.events.subscribe(() => {
      this.current = this.router.url;
    });
  }

  toggleSidebar(): void {
    this.OpenedSideBar = !this.OpenedSideBar;
  }

  toggleQuestionsMenu(): void {
    this.questionsMenuOpen = !this.questionsMenuOpen;
  }
}

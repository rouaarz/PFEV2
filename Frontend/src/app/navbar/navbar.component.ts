import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-navbar', 
  standalone: true, // Déclare le composant comme autonome
  imports: [CommonModule, RouterModule], // Importer les modules nécessaires
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit  {
  constructor() { }

  ngOnInit(): void {
    AOS.init(); 
  }

}


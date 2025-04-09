import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('testsScroller') testsScroller!: ElementRef;
  @ViewChild('prevTest') prevTest!: ElementRef;
  @ViewChild('nextTest') nextTest!: ElementRef;

  private cardWidth: number = 350; // Largeur approximative d'une carte + gap

  ngAfterViewInit() {
    this.initSliderNavigation();
  }

  private initSliderNavigation() {
    const scroller = this.testsScroller.nativeElement;
    const prevBtn = this.prevTest.nativeElement;
    const nextBtn = this.nextTest.nativeElement;

    // Défilement vers la droite
    nextBtn.addEventListener('click', () => {
      scroller.scrollBy({
        left: this.cardWidth,
        behavior: 'smooth'
      });
    });

    // Défilement vers la gauche
    prevBtn.addEventListener('click', () => {
      scroller.scrollBy({
        left: -this.cardWidth,
        behavior: 'smooth'
      });
    });

    // Mettre à jour l'état des boutons
    scroller.addEventListener('scroll', () => this.updateButtonStates());
    
    // État initial
    this.updateButtonStates();
  }

  private updateButtonStates() {
    const scroller = this.testsScroller.nativeElement;
    const prevBtn = this.prevTest.nativeElement;
    const nextBtn = this.nextTest.nativeElement;
    
    const isAtStart = scroller.scrollLeft <= 0;
    const isAtEnd = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1;

    // Style pour le bouton précédent
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

    // Style pour le bouton suivant
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
  }

  // Pour le redimensionnement
  @HostListener('window:resize')
  onWindowResize() {
    this.updateButtonStates();
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartdemandeComponent } from './chartdemande.component';

describe('ChartdemandeComponent', () => {
  let component: ChartdemandeComponent;
  let fixture: ComponentFixture<ChartdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartdemandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

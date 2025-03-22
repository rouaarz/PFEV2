import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsubscribersComponent } from './chartsubscribers.component';

describe('ChartsubscribersComponent', () => {
  let component: ChartsubscribersComponent;
  let fixture: ComponentFixture<ChartsubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsubscribersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

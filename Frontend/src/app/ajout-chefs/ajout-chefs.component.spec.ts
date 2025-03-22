import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChefsComponent } from './ajout-chefs.component';

describe('AjoutChefsComponent', () => {
  let component: AjoutChefsComponent;
  let fixture: ComponentFixture<AjoutChefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutChefsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

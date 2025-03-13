import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesActifsComponent } from './comptes-actifs.component';

describe('ComptesActifsComponent', () => {
  let component: ComptesActifsComponent;
  let fixture: ComponentFixture<ComptesActifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptesActifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptesActifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

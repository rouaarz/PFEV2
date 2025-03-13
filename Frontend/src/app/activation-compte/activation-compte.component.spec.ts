import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationCompteComponent } from './activation-compte.component';

describe('ActivationCompteComponent', () => {
  let component: ActivationCompteComponent;
  let fixture: ComponentFixture<ActivationCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivationCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

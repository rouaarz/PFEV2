import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTestComponentComponent } from './review-test-component.component';

describe('ReviewTestComponentComponent', () => {
  let component: ReviewTestComponentComponent;
  let fixture: ComponentFixture<ReviewTestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewTestComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

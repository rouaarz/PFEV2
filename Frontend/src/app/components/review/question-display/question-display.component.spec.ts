import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDisplayComponent } from './question-display.component';

describe('QuestionDisplayComponent', () => {
  let component: QuestionDisplayComponent;
  let fixture: ComponentFixture<QuestionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

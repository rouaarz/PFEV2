import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPoolComponent } from './question-pool.component';

describe('QuestionPoolComponent', () => {
  let component: QuestionPoolComponent;
  let fixture: ComponentFixture<QuestionPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

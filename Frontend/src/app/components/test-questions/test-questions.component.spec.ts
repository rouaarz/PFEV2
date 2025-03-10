import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuestionsComponent } from './test-questions.component';

describe('TestQuestionsComponent', () => {
  let component: TestQuestionsComponent;
  let fixture: ComponentFixture<TestQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

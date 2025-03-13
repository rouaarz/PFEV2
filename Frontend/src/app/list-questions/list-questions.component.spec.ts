import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionsComponent } from './list-questions.component';

describe('ListQuestionsComponent', () => {
  let component: ListQuestionsComponent;
  let fixture: ComponentFixture<ListQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

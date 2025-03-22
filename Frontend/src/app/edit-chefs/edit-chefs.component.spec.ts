import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChefsComponent } from './edit-chefs.component';

describe('EditChefsComponent', () => {
  let component: EditChefsComponent;
  let fixture: ComponentFixture<EditChefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChefsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

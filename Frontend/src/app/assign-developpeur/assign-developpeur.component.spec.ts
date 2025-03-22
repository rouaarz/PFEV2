import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeveloppeurComponent } from './assign-developpeur.component';

describe('AssignDeveloppeurComponent', () => {
  let component: AssignDeveloppeurComponent;
  let fixture: ComponentFixture<AssignDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDeveloppeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

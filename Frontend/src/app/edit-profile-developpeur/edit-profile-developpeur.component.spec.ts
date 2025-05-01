import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDeveloppeurComponent } from './edit-profile-developpeur.component';

describe('EditProfileDeveloppeurComponent', () => {
  let component: EditProfileDeveloppeurComponent;
  let fixture: ComponentFixture<EditProfileDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileDeveloppeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileAdminComponent } from './edit-profile-admin.component';

describe('EditProfileAdminComponent', () => {
  let component: EditProfileAdminComponent;
  let fixture: ComponentFixture<EditProfileAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

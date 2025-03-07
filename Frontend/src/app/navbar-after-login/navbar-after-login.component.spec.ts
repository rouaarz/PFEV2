import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAfterLoginComponent } from './navbar-after-login.component';

describe('NavbarAfterLoginComponent', () => {
  let component: NavbarAfterLoginComponent;
  let fixture: ComponentFixture<NavbarAfterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAfterLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

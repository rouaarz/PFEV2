import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDeveloppeurComponent } from './dashboard-developpeur.component';

describe('DashboardDeveloppeurComponent', () => {
  let component: DashboardDeveloppeurComponent;
  let fixture: ComponentFixture<DashboardDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDeveloppeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

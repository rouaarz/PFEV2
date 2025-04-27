import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBYAdminComponent } from './test-byadmin.component';

describe('TestBYAdminComponent', () => {
  let component: TestBYAdminComponent;
  let fixture: ComponentFixture<TestBYAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBYAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBYAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

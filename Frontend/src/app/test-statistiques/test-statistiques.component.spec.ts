import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStatistiquesComponent } from './test-statistiques.component';

describe('TestStatistiquesComponent', () => {
  let component: TestStatistiquesComponent;
  let fixture: ComponentFixture<TestStatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStatistiquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

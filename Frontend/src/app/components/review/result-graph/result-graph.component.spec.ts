import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultGraphComponent } from './result-graph.component';

describe('ResultGraphComponent', () => {
  let component: ResultGraphComponent;
  let fixture: ComponentFixture<ResultGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseReponsesComponent } from './analyse-reponses.component';

describe('AnalyseReponsesComponent', () => {
  let component: AnalyseReponsesComponent;
  let fixture: ComponentFixture<AnalyseReponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyseReponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseReponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

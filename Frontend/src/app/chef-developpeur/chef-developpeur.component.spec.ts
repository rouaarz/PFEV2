import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDeveloppeurComponent } from './chef-developpeur.component';

describe('ChefDeveloppeurComponent', () => {
  let component: ChefDeveloppeurComponent;
  let fixture: ComponentFixture<ChefDeveloppeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefDeveloppeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefDeveloppeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

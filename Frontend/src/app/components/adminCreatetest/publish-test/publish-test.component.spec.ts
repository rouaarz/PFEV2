import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTestComponent } from './publish-test.component';

describe('PublishTestComponent', () => {
  let component: PublishTestComponent;
  let fixture: ComponentFixture<PublishTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

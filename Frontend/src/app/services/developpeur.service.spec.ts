import { TestBed } from '@angular/core/testing';

import { DeveloppeurService } from './developpeur.service';

describe('DeveloppeurService', () => {
  let service: DeveloppeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeveloppeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

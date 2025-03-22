import { TestBed } from '@angular/core/testing';

import { ChefDeProjetService } from './chef-de-projet.service';

describe('ChefDeProjetService', () => {
  let service: ChefDeProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefDeProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

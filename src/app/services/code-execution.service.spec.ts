import { TestBed } from '@angular/core/testing';

import { CodeExecutionService } from './code-execution.service';

describe('CodeExecutionService', () => {
  let service: CodeExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

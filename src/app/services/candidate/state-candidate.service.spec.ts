import { TestBed } from '@angular/core/testing';

import { StateCandidateService } from './state-candidate.service';

describe('StateCandidateService', () => {
  let service: StateCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

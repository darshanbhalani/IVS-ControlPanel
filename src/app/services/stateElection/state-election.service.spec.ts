import { TestBed } from '@angular/core/testing';

import { StateElectionService } from './state-election.service';

describe('StateElectionService', () => {
  let service: StateElectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateElectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

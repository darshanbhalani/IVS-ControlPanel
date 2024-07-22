import { TestBed } from '@angular/core/testing';

import { LiveElectionService } from './live-election.service';

describe('LiveElectionService', () => {
  let service: LiveElectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveElectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

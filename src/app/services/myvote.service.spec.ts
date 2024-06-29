import { TestBed } from '@angular/core/testing';

import { MyvoteService } from './myvote.service';

describe('MyvoteService', () => {
  let service: MyvoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyvoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

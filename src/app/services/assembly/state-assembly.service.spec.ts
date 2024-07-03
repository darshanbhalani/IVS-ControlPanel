import { TestBed } from '@angular/core/testing';

import { StateAssemblyService } from './state-assembly.service';

describe('StateAssemblyService', () => {
  let service: StateAssemblyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAssemblyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

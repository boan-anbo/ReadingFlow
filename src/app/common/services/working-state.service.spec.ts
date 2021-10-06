import { TestBed } from '@angular/core/testing';

import { WorkingStateService } from './working-state.service';

describe('WorkingStateService', () => {
  let service: WorkingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

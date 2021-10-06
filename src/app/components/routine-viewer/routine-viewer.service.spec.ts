import { TestBed } from '@angular/core/testing';

import { RoutineViewerService } from './routine-viewer.service';

describe('RoutineViewerService', () => {
  let service: RoutineViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

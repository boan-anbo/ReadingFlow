import { TestBed } from '@angular/core/testing';

import { ProgramViewerService } from './program-viewer.service';

describe('ProgramService', () => {
  let service: ProgramViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

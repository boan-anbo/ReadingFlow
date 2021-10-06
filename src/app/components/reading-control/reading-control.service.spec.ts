import { TestBed } from '@angular/core/testing';

import { ReadingControlService } from './reading-control.service';

describe('ControlService', () => {
  let service: ReadingControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

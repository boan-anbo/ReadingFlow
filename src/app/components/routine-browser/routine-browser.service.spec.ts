import { TestBed } from '@angular/core/testing';

import { RoutineBrowserService } from './routine-browser.service';

describe('RoutineBrowserService', () => {
  let service: RoutineBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

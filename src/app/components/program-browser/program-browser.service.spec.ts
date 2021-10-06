import { TestBed } from '@angular/core/testing';

import { ProgramBrowserService } from './programBrowser.service';

describe('ProgramBrowserService', () => {
  let service: ProgramBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ZoteroBrowserService } from './zotero-browser.service';

describe('ZoteroBrowserService', () => {
  let service: ZoteroBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoteroBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ListBrowserService } from './listBrowser.service';

describe('ListBrowserService', () => {
  let service: ListBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

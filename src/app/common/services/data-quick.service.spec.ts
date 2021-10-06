import { TestBed } from '@angular/core/testing';

import { DataQuickService } from './data-quick.service';

describe('DataQuickService', () => {
  let service: DataQuickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataQuickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

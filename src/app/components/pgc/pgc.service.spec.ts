import { TestBed } from '@angular/core/testing';

import { PgcService } from './pgc.service';

describe('PgcService', () => {
  let service: PgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

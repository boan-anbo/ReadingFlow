import { TestBed } from '@angular/core/testing';

import { ComponentheaderService } from './componentheader.service';

describe('ComponentheaderService', () => {
  let service: ComponentheaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentheaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

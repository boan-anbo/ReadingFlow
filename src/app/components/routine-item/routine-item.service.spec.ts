import { TestBed } from '@angular/core/testing';

import { RoutineItemService } from './routine-item.service';

describe('RoutineItemService', () => {
  let service: RoutineItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

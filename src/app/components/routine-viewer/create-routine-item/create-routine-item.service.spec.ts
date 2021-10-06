import { TestBed } from '@angular/core/testing';

import { CreateRoutineItemService } from './create-routine-item.service';

describe('CreateRoutineItemService', () => {
  let service: CreateRoutineItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRoutineItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

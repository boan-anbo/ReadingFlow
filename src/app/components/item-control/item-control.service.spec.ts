import { TestBed } from '@angular/core/testing';

import { ItemControlService } from './item-control.service';

describe('ItemControlService', () => {
  let service: ItemControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

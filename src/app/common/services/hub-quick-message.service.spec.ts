import { TestBed } from '@angular/core/testing';

import { HubQuickMessageService } from './hub-quick-message.service';

describe('HubQuickMessageService', () => {
  let service: HubQuickMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubQuickMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

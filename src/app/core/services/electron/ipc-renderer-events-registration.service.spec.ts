import { TestBed } from '@angular/core/testing';

import { IpcRendererEventsRegistrationService } from './ipc-renderer-events-registration.service';

describe('IpcRendererEventsRegistrationService', () => {
  let service: IpcRendererEventsRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpcRendererEventsRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

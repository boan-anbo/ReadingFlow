import { TestBed } from '@angular/core/testing';

import { IpcRendererManagerService } from './ipc-renderer-manager.service';

describe('IpcService', () => {
  let service: IpcRendererManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpcRendererManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

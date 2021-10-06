import { TestBed } from '@angular/core/testing';

import { ElectronMonitorService } from './electron-monitor.service';

describe('ElectronMonitorService', () => {
  let service: ElectronMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

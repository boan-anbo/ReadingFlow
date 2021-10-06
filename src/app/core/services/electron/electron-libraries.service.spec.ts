import { TestBed } from '@angular/core/testing';

import { ElectronLibrariesService } from './electron-libraries.service';

describe('ElectronLibrariesService', () => {
  let service: ElectronLibrariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronLibrariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

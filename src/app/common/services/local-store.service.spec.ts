import { TestBed } from '@angular/core/testing';

import { FileImportExportService } from './file-import-export.service';

describe('LocalStoreService', () => {
  let service: FileImportExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

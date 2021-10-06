import { TestBed } from '@angular/core/testing';

import { ItemImporterService } from './item-importer.service';

describe('ItemImporterService', () => {
  let service: ItemImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

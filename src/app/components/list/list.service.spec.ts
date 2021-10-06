import { TestBed } from '@angular/core/testing';

import { ListViewerService } from './list-viewer.service';

describe('ListService', () => {
  let service: ListViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

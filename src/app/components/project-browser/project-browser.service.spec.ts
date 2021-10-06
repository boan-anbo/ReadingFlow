import { TestBed } from '@angular/core/testing';

import { ProjectBrowserService } from './projectBrowser.service';

describe('ProjectBrowserService', () => {
  let service: ProjectBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

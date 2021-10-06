import { TestBed } from '@angular/core/testing';
import {ProgramListItemService} from "./program-list-item.service";


describe('ProgramListItemService', () => {
  let service: ProgramListItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramListItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

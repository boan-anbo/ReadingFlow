import {TestBed} from '@angular/core/testing';

import {ProjectService} from './project.service';
import {ITEM_TYPES} from "../../consts/item-types";

describe('DataService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for emtpy names', () => {
    service.addProject("test");
    service.addProject("");
    expect(service.checkDuplicateName(service.projects, "test", ITEM_TYPES.PROJECT)).toBeTruthy();
    expect(service.checkDuplicateName(service.projects, "", ITEM_TYPES.PROJECT)).toBeFalse();
    console.log(service.projects)
  })
});

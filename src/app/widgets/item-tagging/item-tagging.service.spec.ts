import { TestBed } from '@angular/core/testing';
import {ItemTaggingService} from "./item-tagging.service";


describe('ItemTaggingService', () => {
  let service: ItemTaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemTaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

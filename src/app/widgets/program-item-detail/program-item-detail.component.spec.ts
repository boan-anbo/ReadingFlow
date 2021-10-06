import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramItemDetailComponent } from './program-item-detail.component';

describe('ProgramItemDetailComponent', () => {
  let component: ProgramItemDetailComponent;
  let fixture: ComponentFixture<ProgramItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

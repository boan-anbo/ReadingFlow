import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutineItemComponent } from './create-routine-item.component';

describe('CreateRoutineItemComponent', () => {
  let component: CreateRoutineItemComponent;
  let fixture: ComponentFixture<CreateRoutineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoutineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoutineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNameInputComponent } from './add-name-input.component';

describe('AddNameInputComponent', () => {
  let component: AddNameInputComponent;
  let fixture: ComponentFixture<AddNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNameInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

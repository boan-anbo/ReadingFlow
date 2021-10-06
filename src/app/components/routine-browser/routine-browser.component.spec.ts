import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoutineBrowserComponent } from './routine-browser.component';
import { TranslateModule } from '@ngx-translate/core';

import { RouterTestingModule } from '@angular/router/testing';

describe('RoutineBrowserComponent', () => {
  let component: RoutineBrowserComponent;
  let fixture: ComponentFixture<RoutineBrowserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineBrowserComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.ROUTINE-BROWSER.TITLE'
    );
  }));
});

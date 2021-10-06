import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoteroBrowserComponent } from './zotero-browser.component';
import { TranslateModule } from '@ngx-translate/core';

import { RouterTestingModule } from '@angular/router/testing';

describe('ZoteroBrowserComponent', () => {
  let component: ZoteroBrowserComponent;
  let fixture: ComponentFixture<ZoteroBrowserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ZoteroBrowserComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoteroBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.ZOTERO-BROWSER.TITLE'
    );
  }));
});

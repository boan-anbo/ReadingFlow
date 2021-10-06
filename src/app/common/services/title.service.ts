import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  currentTitle = '';
  unchangedPrepend = '(unsaved) ';
  permanentPrepent = 'RF - ';

  constructor(private title: Title,
  ) {

  }


  setTitle(title: string) {
    if (!title) {return;}
    this.currentTitle = title;
    this.title.setTitle(this.permanentPrepent + title);
  }

  // updateTitle(savedToFile: boolean) {
  //   const newTitle = (!savedToFile ? this.unchangedPrepend : '') + this.currentTitle;
  //   this.title.setTitle(this.permanentPrepent + newTitle);
  // }
}

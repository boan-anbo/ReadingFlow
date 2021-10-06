import {Component, OnInit} from '@angular/core';
import {ReadingService} from './reading.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {READING_STATE} from "../../consts/reading-state";
import {ProgramItem} from "../../models/program-item";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs";
import {EProgramItemType, ProgramItemEntity} from "../../common/backend/rf-client";
import {WorkingStateService} from "../../common/services/working-state.service";

/***
 * Responsible for display and quick action on current reading item.
 */
@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {

  states = READING_STATE;
  autoOpenFileInViewer: any;

  constructor(
    public readingService: ReadingService,
    private translate: TranslateService,
    private log: LoggingService,
    public state: WorkingStateService
  ) {
  }

  ngOnInit(): void {
    this.log.info('ReadingComponent INIT');
  }


  getReadingItem(): Observable<ProgramItemEntity> {
    return this.readingService
      .currentReading

      .pipe(
        filter(item => item !== null),
        filter(entry => entry.type === EProgramItemType.ITEM)) as Observable<ProgramItemEntity>;
  }

  getCurrentReadingItemTagsIds() {
    return this.state.currentReadingItem.tags.map(tag => tag.id);
  }
}

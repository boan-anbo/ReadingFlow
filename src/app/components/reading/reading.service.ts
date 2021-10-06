import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Item} from '../../models/item';
import {ProgramItem} from '../../models/program-item';
import {READING_STATE} from '../../consts/reading-state';
import {ProgramBreak} from '../../models/program-break';
import {ReadingControlOptions} from "../../models/control-options";
import {ItemService} from "../item/item.service";
import {HubQuickMessageService} from "../../common/services/hub-quick-message.service";
import {DataClient, EProgramItemType, ProgramItemEntity} from "../../common/backend/rf-client";
import {UPDATE_WORKING_STATE_INSTRUCTIONS} from "../../consts/hub-instruction";

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  get currentReadingItem(): ProgramItemEntity {
    return this._currentReadingItem;
  }

  set currentReadingItem(value: ProgramItemEntity) {
    this._currentReadingItem = value;
    this.hubQ.tellWorkingStateToUpdate(UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_READING, value)
  }


  currentReadingMonitor: Subscription;
  pastProgramEntries: ProgramItemEntity[] = [];
  currentReading: BehaviorSubject<ProgramItemEntity> = new BehaviorSubject<ProgramItemEntity>(null);
  // this is where this item is acutlaly held. When it updates, the item will be sent to HubQ as well as a readonly copy.
  private _currentReadingItem: ProgramItemEntity = null;
  lastReadingState: READING_STATE = READING_STATE.IDLE;
  currentReadingState: BehaviorSubject<READING_STATE> = new BehaviorSubject<READING_STATE>(READING_STATE.IDLE);
  currentReadingStateMonitor: Subscription;

  // manage the order and the state of current reading.
  constructor(
    private log: LoggingService,
    private item: ItemService,
    private hubQ: HubQuickMessageService,
    private data: DataClient
  ) {
    this.currentReadingMonitor = this.currentReading.subscribe(this.monitorReading);
    this.currentReadingStateMonitor = this.currentReadingState.subscribe(this.monitorReadingState);
  }

  monitorReadingState = async (state: READING_STATE) => {
    this.lastReadingState = this.currentReadingState.getValue();
  };


  monitorReading = async (programItem: ProgramItemEntity) => {
    this.log.info(`Reading Monitoring received new Program Entry`, programItem);
    await this.addCurrentReadingItemToLast();
    if (programItem !== null) {
      if (programItem.type === EProgramItemType.ITEM) {
        this.log.info(`Start Reading ${programItem.item.name}`);

        // let backend know the program item reading has started.
        await this.data.startProgramItem(programItem.id).toPromise();

        this.currentReadingState.next(READING_STATE.READING);
        // update current reading item
        this.currentReadingItem = programItem;
        this.log.info('Reading Started', this.currentReadingState.getValue());
      }
      if (programItem.type === EProgramItemType.BREAK) {
        this.log.info(`Start break ${programItem.duration}`);
        this.currentReadingState.next(READING_STATE.ON_BREAK);
      }
    }
    if (programItem == null && this.currentReadingState.getValue() !== READING_STATE.IDLE) {
      this.currentReadingState.next(READING_STATE.FINISHED);
    }
  };

  isItem(programItem: ProgramItem): boolean {
    return programItem instanceof Item;
  }

  isBreak(programItem: ProgramItem): boolean {
    return programItem instanceof ProgramBreak;
  }

  getCurrentReadingEntry(): ProgramItemEntity {
    return this.currentReading.getValue();
  }

  getCurrentReadingState() {
    return this.currentReadingState.getValue();
  }

  stopReading() {
    this.currentReading.next(null);
  }

  // both breaks and items are added to history for stats for purpose. To go back to only items, I can filter out break afterwards.
  async addCurrentReadingItemToLast() {
    const currentProgramEntry = await this.getCurrentReadingEntry();
    if (currentProgramEntry) {
      // timestamp end date time
      currentProgramEntry.ended = new Date();
      this.pastProgramEntries.push(currentProgramEntry);
    }
  }

  async readNext(nextItemOnProgram: ProgramItemEntity, opt?: ReadingControlOptions) {
    this.currentReading.next(nextItemOnProgram);
    await this.readingControlOptionsHandler(nextItemOnProgram, opt);
  }

  async readingControlOptionsHandler(nextItemOnProgram: ProgramItemEntity, opt: ReadingControlOptions) {
    if (!opt) return;
    if (opt.autoOpenInViewer) {
      if (nextItemOnProgram.type === EProgramItemType.ITEM) {
        await this.item.openItemInViewer(nextItemOnProgram.item);
      }
    }
  }


  finishedReading() {
    this.currentReading.next(null);
    this.currentReadingState.next(READING_STATE.FINISHED);
  }

  isReading() {
    return this.currentReadingState.getValue() === READING_STATE.READING;
  }
}

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProgramListItemService} from './program-list-item.service';
import {DataClient, EProgramItemType, ItemEntity, ProgramItemEntity} from '../../common/backend/rf-client';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {HubMessage} from '../../consts/hub-message';
import {PROGRAM_LIST_ITEM_INSTRUCTIONS} from '../../consts/hub-instruction';
import {HubService} from '../../common/services/hub.service';
import {Subscription} from 'rxjs';
import {LoggingService} from '../../core/services/logging/logging.service';

@Component({
  selector: 'app-program-list-item',
  templateUrl: './program-list-item.component.html',
  styleUrls: ['./program-list-item.component.scss']
})
export class ProgramListItemComponent implements OnInit, OnDestroy {

  // I don't understand why list item component holds the selections. Why not program viewer?
  @Output() itemToDelete: EventEmitter<ItemEntity> = new EventEmitter<ItemEntity>();
  @Input() programItem: ProgramItemEntity;
  @Input() entryIndex: number;
  @Input() detailed = false;
  isItem = false;
  isBreak = false;
  private programItemHubServiceSubscription: Subscription;

  constructor(
    private programListItemService: ProgramListItemService,
    private hub: HubService,
    private data: DataClient,
    private log: LoggingService
  ) {

  }

  ngOnDestroy(): void {
    this.programItemHubServiceSubscription?.unsubscribe();
  }

  programListitemHubMessageHandler = async (message: HubMessage<any, PROGRAM_LIST_ITEM_INSTRUCTIONS>) => {
    this.log.info('Program List Item Receives Message', message);
    switch (message.instruction) {
      case PROGRAM_LIST_ITEM_INSTRUCTIONS.RELOAD_DATA:
        await this.reloadProgramItem();
        break;
      default:
        break;
    }
  };

  ngOnInit(): void {
    // manually save state to avoid recalculation with angular detection
    this.isItem = (this.programItem.type === EProgramItemType.ITEM);
    this.isBreak = (this.programItem.type === EProgramItemType.BREAK);


    this.programItemHubServiceSubscription = this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.PROGRAM_LIST_ITEM_SERVICE || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.programListitemHubMessageHandler);
  }

  onItemDelete(item: ItemEntity) {
    this.itemToDelete.emit(item);
  }


  isRead(entry: ProgramItemEntity) {
    return entry.type === EProgramItemType.ITEM && entry.read;
  }

  isUnread(entry: ProgramItemEntity) {

    return entry.type === EProgramItemType.ITEM && !entry.read;

  }

  getEntryItem(entry: ProgramItemEntity) {
    if (entry.type === EProgramItemType.ITEM) {
      return entry.item;
    } else {
      throw new Error('Wrong entry provided and has no item.');
    }
  }

  private async reloadProgramItem() {
    this.programItem = await this.data.getProgramItem(this.programItem.id).toPromise();
  }
}

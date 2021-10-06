import {AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FileService} from '../../common/services/file.service';
import {FileViewerService} from '../../common/services/file-viewer.service';
import {ItemService} from './item.service';
import {DataClient, ItemEntity} from '../../common/backend/rf-client';
import {HubService} from '../../common/services/hub.service';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {HubMessage} from '../../consts/hub-message';
import {ITEM_VIEWER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {Subscription} from 'rxjs';
import {LoggingService} from '../../core/services/logging/logging.service';
import {NotImplementedError} from "../../exceptions/not-implemented-error";
import {ClickItemEvent} from "../../interfaces/ClickItemEvent";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, AfterViewChecked, OnDestroy {

  // local state used only when 'sendItemToItemControlByClick is enabled.
  _selected = false;
  @Input() detailed = false;
  @Output() itemToDelete = new EventEmitter<ItemEntity>();
  @Output() itemClicked = new EventEmitter<ClickItemEvent>();
  @Input() uniqueProgramItemId: string;
  currentFileIndex = -1;
  @Input() item: ItemEntity;
  @Input() order = 0;
  @Input() itemIndex: number;
  // note this is set to false because its main wrapper items, ProgramItem and ListItem, both implments their own send-to-item logic with better control, i.e. with wrapper status like 'finished'. So this is not used unless enabled.
  // ENABLE WITH CAUTION.
  @Input() sendItemToItemControlByClick = false;

  // itemId: any;

  itemHubServiceSubscription: Subscription;

  constructor(
    private fileService: FileService,
    public itemService: ItemService,
    private fileViewerService: FileViewerService,
    private hub: HubService,
    private data: DataClient,
    private log: LoggingService
  ) {
  }

  ngOnInit(): void {
    this.itemHubServiceSubscription = this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ITEM_VIEWER_COMPONENT || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.itemHubMessageHandler);
  }

  itemHubMessageHandler = async (message: HubMessage<any, ITEM_VIEWER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case ITEM_VIEWER_INSTRUCTIONS.RELOAD_DATA:
        const taggedItemIds = message.payload as string[];
        // if the current item is among those which has just been tagged.
        if (taggedItemIds.indexOf(this.item.id) > -1) {
          await this.reloadItem();
        }
        break;
      // case ITEM_INSTRUCTIONS.DETECT_CHANGE:
      //   break;
      default:
        break;
    }
  };


  async ngOnDestroy(): Promise<void> {
    await this.itemHubServiceSubscription?.unsubscribe();
  }


  ngAfterViewChecked(): void {

  }

  // fetch latest item from server.
  async reloadItem() {
    if (!this.item.id) {
      new Error('No Item Found');
    }
    this.log.info('Item is realoding', this.item.id);
    this.item = await this.data.getItem(this.item.id).toPromise();

  }

  setItemSelectedInControl(item: ItemEntity) {
    if (!this.sendItemToItemControlByClick) {
      return;
    }
    if (this._selected) {
      this.itemService.askItemControlToSelectItem(item);

    } else {
      this.itemService.askItemControlToUnselectItem(item);
    }
    this._selected = !this._selected;


  }

  deleteItem() {
    throw new NotImplementedError('Delete Item');
  }

  clickItem(item: ItemEntity, event: MouseEvent) {
    this.itemClicked.emit({
      item,
      event
    });
  }
}

import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {HubMessage} from '../../consts/hub-message';
import {
  LIST_VIEWER_INSTRUCTIONS,
  PROGRAM_VIEWER_INSTRUCTIONS,
  UPDATE_WORKING_STATE_INSTRUCTIONS
} from '../../consts/hub-instruction';
import {updateOrder} from '../../../../lib-js/order';
import {
  CreateGenericWithParentAndItemsDto,
  CreateItemDto,
  DataClient,
  EEntityType,
  EImportSourceType,
  GenericCreateWithParentAndNewItemsDto,
  ImportSourceCreateDto,
  ItemEntity,
  ListClient,
  ListEntity,
  ListItemEntity
} from '../../common/backend/rf-client';
import {HubQuickMessageService} from '../../common/services/hub-quick-message.service';
import {ITEM_OPERATIONS} from '../../consts/item-operations';
import {NoListSelectedError} from '../../exceptions/no-list-selected-error';
import {DialogService} from "../../common/services/dialog.service";
import {RoutingQuickService} from "../../common/services/routing-quick.service";

@Injectable({
  providedIn: 'root'
})
export class ListViewerService {
  get currentListId(): string {
    return this._currentListId;
  }

  set currentListId(value: string) {
    this._currentListId = value;
  }


  get currentList(): ListEntity {
    return this._currentList;
  }

  set currentList(value: ListEntity) {
    this._currentList = value;
    this.hubQ.tellWorkingStateToUpdate(UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_LIST, value);
    this.updateCurrentListOrder();
  }

  private _currentList: ListEntity;

  private _currentListId: string = null;

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private data: DataClient,
    private hubQ: HubQuickMessageService,
    private rfList: ListClient,
    private dialog: DialogService,
    private routeQ: RoutingQuickService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.LIST_VIEWER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.listHubMessageHandler);

  }

  listHubMessageHandler = async (message: HubMessage<any, LIST_VIEWER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case LIST_VIEWER_INSTRUCTIONS.ADD_ITEMS_TO_LIST:
        await this.addItemsToList(message.payload);
        break;
      case LIST_VIEWER_INSTRUCTIONS.ADD_FILES_TO_LIST:
        await this.addFilesToList(message.payload);
        break;
      case LIST_VIEWER_INSTRUCTIONS.RELOAD_DATA:
        const targetListId = message.payload as string;
        await this.loadList(targetListId);
        break;
      case LIST_VIEWER_INSTRUCTIONS.ADD_ZOTERO_COLLECTION_KEY:
        const uniqueKey = message?.payload as string;
        await this.addImportSourceToList(EImportSourceType.ZOTERO, uniqueKey);
        break;
      default:
        break;
    }
  };

  hasList() {
    return this.currentList?.id.length > 1;
  }

  sendAddItemsToProgramMessage(payload: ListItemEntity[]) {
    // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
    this.log.info('Sending message to add items to current program with the payload', payload);
    this.hub.sendHubMessage<PROGRAM_VIEWER_INSTRUCTIONS>({
      instruction: PROGRAM_VIEWER_INSTRUCTIONS.ADD_ITEMS_TO_PROGRAM,
      sender: COMPONENTS.LIST_VIEWER,
      receiver: COMPONENTS.PROGRAM_VIEWER,
      payload
    });
  }

  hasItem(newItem: ItemEntity) {
    return this._currentList.listItems.some(listItem => listItem.item.id === newItem.id);
  }

  // addItemToList(item: ItemEntity) {
  //   if (!this.hasItem(item)) {
  //     const newListItem = this.data.createListItems(new CreateGenericWithParentAndItemsDto({
  //       parentId: this.currentList.id,
  //       itemIds: [item.id]
  //     }));
  //     this._currentList.listItems.push(newListItem);
  //   }
  // }

  async addItemsToList(items: ItemEntity[]) {
    this.log.info('List Viewer starts to create list items');
    const createdListItems = await this.data.linkListItems(new CreateGenericWithParentAndItemsDto({
      parentId: this.currentList.id,
      itemIds: items.map(i => i.id)
    })).toPromise();
    this.log.info('List items created', createdListItems);
    await this.loadList();
  }



  async loadList(listId?: string) {

    const listIdToLoad = listId ? listId : this._currentListId;
    if (!listIdToLoad) {
      throw new NoListSelectedError();
    }
    this.log.info('Loading list');
    this.currentList = await this.data.getListById(listIdToLoad).toPromise();
  }

  updateCurrentListOrder() {

    this._currentList.listItems = updateOrder(this._currentList.listItems);

  }

  removeItem(item: ItemEntity) {
    const indexToRemove = this._currentList.listItems.findIndex(listItem => listItem.item.id === item.id);
    this._currentList.listItems.splice(indexToRemove, 1);
  }

  addSelectedItemsToCurrentProgram(itemToAddToProgram: ListItemEntity[]) {
    this.sendAddItemsToProgramMessage(itemToAddToProgram);
  }


  getAllCurrentListItemIds() {
    return this.currentList?.listItems?.map(listItem => listItem.id);
  }


  async addFilesToList(filePaths: string[]) {
    this.log.info('Creating list items from files');
    const result = await this.data.createListItemsWithNewItems(new GenericCreateWithParentAndNewItemsDto({
      parentId: this.currentList.id,
      createItemDtos: filePaths.map(path => new CreateItemDto({
        name: path,
        filePath: path
      }))
    })).toPromise();
    this.log.info('Added To List From FIles', result);
    await this.loadList();

  }

  tellItemControlToDoItem(listItem: ListItemEntity, operation: ITEM_OPERATIONS) {
    this.hubQ.tellItemControlToDoItem(COMPONENTS.LIST_VIEWER, listItem.item, operation);
  }

  announceSingleSelection(entry: ListItemEntity) {
    this.hubQ.AnnounceSingleSelection(COMPONENTS.LIST_VIEWER, entry.item);
  }

  async syncWithZotero() {
    if (!this._currentListId) {
      throw new NoListSelectedError();
    }
    await this.data.syncListWithZoteroSource(this._currentListId).toPromise();
    await this.loadList();
  }

  async analyzeListPdfs() {

    if (!this._currentListId) {
      throw new NoListSelectedError();
    }
    await this.data.checkListItemsPdfFiles(this._currentListId).toPromise();
    await this.loadList();
  }

  public async addImportSourceToList(type: EImportSourceType, uniqueKey: string) {

    if (!uniqueKey) {
      throw new Error('No Unique Key Provided.');
    }

    if (!this._currentListId) {
      throw new NoListSelectedError();
    }
    await this.data.addImportSourceToEntity(new ImportSourceCreateDto({
      sourceType: type,
      sourceUniqueId: uniqueKey,
      linkedEntityType: EEntityType.LIST,
      linkedItemId: this._currentListId
    })).toPromise();
    await this.loadList();
  }

  async deleteList() {


    if (!this._currentListId) {
      throw new NoListSelectedError();
    }

    if (!this.dialog.confirm("Sure to delete this list?")) return;
    await this.rfList.deleteList(this._currentListId).toPromise();
    // after deleting the list, got back  to list browser.
    await this.routeQ.toListBrowserFirstReload();
  }
}

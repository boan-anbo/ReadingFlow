import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {ReadingService} from '../reading/reading.service';
import {HubService} from '../../common/services/hub.service';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {HubMessage} from '../../consts/hub-message';
import {
  EVERYONE_INSTRUCTIONS,
  LIST_VIEWER_INSTRUCTIONS,
  PROGRAM_VIEWER_INSTRUCTIONS,
  UPDATE_WORKING_STATE_INSTRUCTIONS
} from '../../consts/hub-instruction';
import {ProgramEmptyError} from '../../exceptions/program-empty-error';
import {InstructionUnimpementedError} from '../../exceptions/InstructionUnimplementedError';
import {
  CreateGenericWithParentAndItemsDto,
  DataClient,
  EProgramItemType,
  GenericManyIdsDto,
  ItemEntity,
  ItemFileEntity,
  ListEntity,
  ListItemEntity,
  ProgramEntity,
  ProgramItemEntity
} from '../../common/backend/rf-client';
import {DataQuickService} from '../../common/services/data-quick.service';
import {NoProjectSelectedError} from '../../exceptions/no-project-selected-error';
import {Selections} from '../../common/utils/selections';
import {HubQuickMessageService} from '../../common/services/hub-quick-message.service';
import {ReadingControlOptions} from '../../models/control-options';
import {ITEM_OPERATIONS} from '../../consts/item-operations';
import {WorkingStateService} from "../../common/services/working-state.service";
import {RoutingQuickService} from "../../common/services/routing-quick.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramViewerService {
  currentProgramId: string;
  programItemSelections = new Selections<ProgramItemEntity>();

  get program(): ProgramEntity {
    return this._program;
  }

  set program(value: ProgramEntity) {
    this._program = value;
    // save current program id in case the entity itself became unavailable.
    this.currentProgramId = value.id;
    // reset program item selectsion
    // this.programItemSelections.clear();
    // update working state
    this.hubQ.tellWorkingStateToUpdate(UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_PROGRAM, value);
    this.log.info('Setting current program', value.id);
    // this.jumpToNextUnreadProgramItem();
  }

  // the single source of true for program entries.
  private _program: ProgramEntity;

  // note this is only for program's own list's rendition, not for other components to consume. other components all get current program entry from Reading Service, NOT program service.
  _currentProgramItem: ProgramItemEntity = null;
  currentEntryIndex = 0;

  constructor(
    private log: LoggingService,
    private readingService: ReadingService,
    private hub: HubService,
    private hubQ: HubQuickMessageService,
    private data: DataClient,
    private dataQ: DataQuickService,
    private state: WorkingStateService,
    private routeQ: RoutingQuickService
  ) {
    this.hub.hubMessages
      .pipe(
        filter(message => message !== null),
        filter(message => message?.receiver === COMPONENTS.PROGRAM_VIEWER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.programHubMessagesHandler);
  }

  jumpToNextUnreadProgramItem() {
    this.log.info('Jumping to next unread program item');
    const nextIndex = this.getNextUnreadItemIndex(this.currentEntryIndex);
    this.log.info('Found next unread item\'s index to jump to', nextIndex);
    if (nextIndex > -1 && !this.isAtTheEnd()) {
      this.currentEntryIndex = nextIndex;
    }
  }

  getNextItem(opt: ReadingControlOptions): ProgramItemEntity {
    this.log.info('Current Reading Index?', this.currentEntryIndex);
    this.log.info('Getting Next Item. Is At The End?', this.isAtTheEnd());
    if (!this.isAtTheEnd()) {
      const current = this.getProgramItems()[this.currentEntryIndex];// save a copy of current to current program for reference of program list and pass on to program list to detect whether the current item on list is being read.
      this.log.info(`Program viewer found the next item to read of index ${this.currentEntryIndex}`, current);
      this._currentProgramItem = current;
      // set index to next item;
      this.currentEntryIndex++;
      return current;
    } else {
      // there is no longer next item;
      this._currentProgramItem = null;
      return null;
    }
  }

  getNextUnreadItemIndex(currentItemIndex: number): number {
    return this.getProgramItems().findIndex((item, index) => {
      if (item.type === EProgramItemType.ITEM) {
        // return result that's unread and not the current item.
        return !item.read && index !== currentItemIndex;
      } else {
        return false;
      }
    });
  }

  getSelectedEntries(): ProgramItemEntity[] {
    return this.programItemSelections.getSelectedItems(this.getProgramItems(), 'id');
  }


  programHubMessagesHandler = async (message: HubMessage<any, PROGRAM_VIEWER_INSTRUCTIONS | EVERYONE_INSTRUCTIONS>) => {
    this.log.info('Program receives message', message.instruction);
    switch (message.instruction) {
      case PROGRAM_VIEWER_INSTRUCTIONS.RELOAD_DATA:
        // payload = program id.
        await this.loadProgram(message.payload);
        break;
      case PROGRAM_VIEWER_INSTRUCTIONS.ADD_ITEMS_TO_PROGRAM:
        await this.addItemsToProgram(message.payload);
        break;
      case PROGRAM_VIEWER_INSTRUCTIONS.PROGRAM_DELETE_PROGRAM_ITEM:
        const programItem = message.payload as ItemEntity;
        this.removeEntryFromProgramByItem(programItem);
        break;

      case PROGRAM_VIEWER_INSTRUCTIONS.SET_PROGRAM_LIST_ITEM_READ:
        const programItemId = (message.payload as ProgramItemEntity).id;
        await this.setProgramItemReadByProgramItemId(programItemId);
        break;

      // case PROGRAM_INSTRUCTIONS.PROGRAM_SELECT_PROGRAM_ITEMS:
      case PROGRAM_VIEWER_INSTRUCTIONS.PROGRAM_SET_PROGRAM_ITEM_IMPORTANCE:
        return;
      case PROGRAM_VIEWER_INSTRUCTIONS.PROGRAM_SERVICE_SET_PROGRAMITEM_READ_BY_ITEMID:
        const itemId = message.payload as string;
        await this.setProgramItemReadByItemId(itemId);
        break;
      case PROGRAM_VIEWER_INSTRUCTIONS.UNSELECT_ALL_ENTRIES_EXCEPT:
        throw new InstructionUnimpementedError(message);

      case PROGRAM_VIEWER_INSTRUCTIONS.RELOAD_ITEMS:
        const itemsToReload: string[] = message.payload as string[];
        await this.reloadProgramItems(itemsToReload);
      // case EVERYONE_INSTRUCTIONS.ANNOUNCE_SINGLE_SELECTION:
      //   const exceptionItem = message.payload as ItemEntity;
      //   this.unselectAllEntriesExcept(exceptionItem);
      //   break;
    }
  };

  clearProgram() {
    this.program = null;
    this.currentProgramId = null;
  }

  addEntriesToProgram(programItems: ProgramItemEntity []) {
    programItems.forEach(entry => {
      if (this.isProgramItem(entry)) {
        this.addEntryDirectlyToProgram(entry);
      }
      if (this.isProgramBreak(entry)) {
        this.addBreakToProgram(entry);
      }
    });
  }

  addEntryDirectlyToProgram(programEntry: ProgramItemEntity) {
    this._program.programItems.push(programEntry);
    // this might need refactoring later then the operation of updating orders become too expensive for large amount of adding to program list.
    this.updateCurrentProgramItemOrder();
  }

  // note item order is different from entry order. entry order represents the position in program list. a break alsdo has entry order. an item however only represents the item in relation to other items.
  updateProgramItemOrders(program: ProgramItemEntity[]) {
    let itemOrder = 1;
    let breakOrder = 1;
    program.forEach(entry => {
      if (this.isProgramItem(entry)) {
        entry.order = itemOrder;
        itemOrder++;
      } else {
        entry.order = breakOrder;
        breakOrder++;
      }
    });
    return program;
  }

  updateCurrentProgramItemOrder() {
    this.program.programItems = this.updateProgramItemOrders(this.getProgramItems());
  }


  getProgramItems(): ProgramItemEntity[] {
    return this.program.programItems;
  }


  async addItemsToProgram(itemsToLink: ListItemEntity[]) {


    if (!this.currentProgramId) {
      const createdTemporaryProgram = await this.createTemporaryProgram();
      this.currentProgramId = createdTemporaryProgram.id;
    }

    this.log.info(`Linking program ${this.currentProgramId} with`, itemsToLink);

    await this.data.linkProgramItems(new CreateGenericWithParentAndItemsDto(
      {
        itemIds: itemsToLink.map(i => i.id),
        parentId: this.currentProgramId,
      }
    )).toPromise();
    await this.loadProgram();
  }

  async createTemporaryProgram() {
    const projectId = this.state.currentProject.id;
    if (!projectId) {
      throw new NoProjectSelectedError();
    }

    const createTemporaryProgram = await this.data.createTemporaryProgram(projectId).toPromise();
    await this.routeQ.toProgramViewerSecond();
    return createTemporaryProgram;

  }


  isAtTheEnd(): boolean {
    return (this.currentEntryIndex === this.getProgramItems().length);
  }

  canAddBreak() {
    return this.getProgramItems().length > 0 && this.isProgramItem(this.getProgramItems()[this.getProgramItems().length - 1]);
  }


  addBreakToProgram(programBreak: ProgramItemEntity) {
    if (!this.canAddBreak()) {
      this.log.warn('Cannot add break to empty program or after another break');
      return;
    }
    this.addEntryDirectlyToProgram(programBreak);
  }

  getCurrentReadingEntry() {
    return this.readingService.getCurrentReadingEntry();
  }

  isProgramEmpty(): boolean {
    return this.getProgramItems().length === 0;
  }


  isProgramItem(entry: ProgramItemEntity) {
    return entry.type === EProgramItemType.ITEM;
  }

  isProgramBreak(entry: ProgramItemEntity) {
    return entry.type === EProgramItemType.BREAK;
  }

  setProgramItemReadByProgramItemId = async (programItemId: string): Promise<void> => {
    const found = this.getProgramItems().find(programItem => programItem.id === programItemId) as ProgramItemEntity;
    if (found) {
      await this.setRead(found);
      this.log.info('Set Program Item as Read', found);
    }
  };

  setProgramItemReadByItemId = async (itemId: string): Promise<void> => {
    const found = this.getProgramItems().find(programItem => programItem.item.id === itemId);
    if (found) {
      await this.setRead(found);
      this.log.info('Set Program Item as Read', found);
    }
  };

  // set item read. The back end will take care of making end time, calculate timespan, check the pdf file etc.
  async setRead(found: ProgramItemEntity) {

    found.read = true;
    // persist the date change to database;
    this.log.info('Persisting program item entity change to database', found);

    // await this.dataQ.updateProgramItemEntity(found); // deprecated in favor of end.
    await this.data.endProgramItem(found.id).toPromise();
  }

  sendAddItemToListMessage(item: ItemEntity) {
    this.hub.sendHubMessage<LIST_VIEWER_INSTRUCTIONS>({
      instruction: LIST_VIEWER_INSTRUCTIONS.ADD_ITEMS_TO_LIST,
      sender: COMPONENTS.FILE_IMPORTER,
      receiver: COMPONENTS.LIST_VIEWER,
      payload: item
    });
  }

  async reCheckItemFiles(itemFiles: ItemFileEntity[]) {
    for await (const itemFile of itemFiles) {

      await this.data.checkCurrentFileInfo(itemFile.id).toPromise();
    }
  }

  async reCheckItemFileAndReload(programItem: ProgramItemEntity) {
    await this.reCheckItemFiles(programItem.item.itemFiles);
    await this.reloadProgramItems([programItem.id]);
  }

  addAllItemsToList(list?: ListEntity): void {

    const allItems = this.getProgramItems();
    if (allItems?.length > 1) {


      allItems.forEach(programItem => this.sendAddItemToListMessage(programItem.item));
    } else {
      throw new ProgramEmptyError('Cannot add program item to list.');
    }
  }


  unselectAllEntriesExcept(exceptionEntry: ProgramItemEntity): void {
    this.getSelectedEntries().forEach(selectedEntry => {
      if (selectedEntry.id !== exceptionEntry.id) {
        this.programItemSelections.unselectId(selectedEntry.id);
      }
    });
  }

  async loadProgram(programId?: string, reload = false) {
    // if not reload mode, the item selections will be cleared for each loading.
    if (!reload) {
      this.programItemSelections.clear();
    }
    const targetProgramId = programId ?? this.currentProgramId;
    if (!targetProgramId) {
      throw new NoProjectSelectedError();
    }
    this.log.info('Program-Viewer is loading data for', targetProgramId);
    this.program = await this.data.getProgramById(targetProgramId).toPromise();
    this.log.info('Program-Viewer loaded data for', targetProgramId);
  }


  tellItemControlToDoItem(entry: ProgramItemEntity, operation: ITEM_OPERATIONS) {
    if (entry.type === EProgramItemType.ITEM) {
      this.hubQ.tellItemControlToDoItem(COMPONENTS.PROGRAM_LIST_ITEM_SERVICE, entry.item, operation);
    }
  }

  /**
   *
   * @param itemIdsToReload reload program with latest version of the data but keeps the selections.
   */
  async reloadProgramItems(itemIdsToReload: string []) {

    await this.loadProgram(this.program.id, true);

    //I not selectively update program item because current it breaks the selections of program items

    // this.log.silly(`Program viewer to reload ${itemIdsToReload.length} items`, itemIdsToReload)
    // for await (const itemToReloadId of itemIdsToReload)
    // {
    //
    //   const programItemsIndexesWithTheSameItem: number[] = []
    //   this.program.programItems.forEach((programItem, index) => {
    //     if (programItem.item.id === itemToReloadId) {
    //       programItemsIndexesWithTheSameItem.push(index);
    //     }
    //   })
    //   const programItemToUpdate: ProgramItemEntity = this.program.programItems[0];
    //   const updatedItem = await this.data.getProgramItem(programItemToUpdate.id).toPromise();
    //   this.log.info(`Updated Program item received by program viewer`, updatedItem);
    //   // this is the case because there can be multiple program items associated with the same item. Therefore, a change in item requires all program items to reload.
    //   programItemsIndexesWithTheSameItem.forEach((index) => this.program.programItems[index] = updatedItem);
    // }


  }


  readNext() {
    this.hubQ.tellReadingControlToReadnext();
  }

  getProgramItemIndexById(programId: string): number {
    return this.getProgramItems().findIndex(programItem => programItem.id === programId);
  }

  async setUnread(programItems: ProgramItemEntity[]) {
    const dto = new GenericManyIdsDto({
      ids: programItems.map(programItem => programItem.id)
    });
    await this.data.setProgramItemsUnread(dto).toPromise();
  }

  async setAllUnread() {
    await this.setUnread(this.getProgramItems());
    await this.loadProgram();
  }

  private removeEntryFromProgramByItem(programItem: ItemEntity) {
    let entryIndex = -1;
    // @ts-ignore
    this.program.programItems = this.getProgramItems().filter((entry, index) => {
      if (this.isProgramBreak(entry)) {
        return true;
      } else {
        // if it is the id matched, then this entry will be filtered out. saving the filtered entry index to be used to delete its break after;

        entryIndex = index;
      }
    });
    // remove break if there is after the removed entry;
    if (entryIndex > -1) {
      if (this.getProgramItems()[entryIndex] && this.getProgramItems()[entryIndex].type === EProgramItemType.BREAK) {
        this.getProgramItems().splice(entryIndex, 1);
      }
    }
    this.updateCurrentProgramItemOrder();
  }


  async deleteProgram(): Promise<void> {
    if (this.currentProgramId) {
      await this.data.deleteProgram(this.currentProgramId).toPromise()

      await this.routeQ.toProgramBrowserSecondReload();
      this.clearProgram();
    }
    // await this.data.
    // await this.data.Delete
  }
}

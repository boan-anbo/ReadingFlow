import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ListViewerService} from './list-viewer.service';
import {DuplicateNameError} from '../../exceptions/duplicate-name-error';
import {ITEM_TYPES} from '../../consts/item-types';
import {ItemImporterService} from '../../common/services/item-importer.service';
import {ProjectService} from '../../common/services/project.service';
import {LoggingService} from '../../core/services/logging/logging.service';
import {FileImportExportService} from '../../common/services/file-import-export.service';
import {ListItem} from '../../models/list-item';
import {Subscription} from 'rxjs';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {LIST_COMPONENT_INSTRUCTIONS} from '../../consts/hub-instruction';
import {ItemEntity, ListEntity, ListItemEntity, ProgramItemEntity} from '../../common/backend/rf-client';
import {WorkingStateService} from '../../common/services/working-state.service';
import {ITEM_OPERATIONS} from '../../consts/item-operations';
import {Selections} from '../../common/utils/selections';
import {ClickListItemEvent} from "../../interfaces/ClickListItemEvent";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListViewerComponent implements OnInit, OnDestroy {

  currentListSelections = new Selections<ListItemEntity>();
  hubMonitor: Subscription;

  constructor(
    public listViewerService: ListViewerService,
    private itemImporterService: ItemImporterService,
    private dataService: ProjectService,
    private fileImportExportService: FileImportExportService,
    private log: LoggingService,
    private hub: HubService,
    private detect: ChangeDetectorRef,
    public state: WorkingStateService
  ) {
  }


  ngOnDestroy(): void {
    this.hubMonitor?.unsubscribe();
  }

  listComponentHubMessagesHandler = (message: HubMessage<any, LIST_COMPONENT_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case LIST_COMPONENT_INSTRUCTIONS.DETECT_CHANGE:
        this.log.info('List Component To Detect Change');
        // this.detect.detectChanges();
        this.listViewerService.currentList.listItems = [...this.listViewerService.currentList.listItems];
        return;

    }
  };

  async ngOnInit(): Promise<void> {
    // console.log('ListComponent INIT');
    // this.loadMockData();

    // await this.loadList();
  }



  trackBy = (index, listItem: ListItem) => listItem.id;


  // async loadList() {
  //   await this.listViewerService.loadList();
  // }

  getCurrentList() {
    return this.listViewerService.currentList;
  }

  async saveList(currentList: ListEntity) {
    await this.fileImportExportService.saveListToFile(currentList);
  }

  async loadFile() {
    this.listViewerService.currentList = await this.fileImportExportService.loadFileToList();
  }

  addSelectedItemsToProgram() {
    this.listViewerService.addSelectedItemsToCurrentProgram(this.getAllSelectListItems());
  }

  getAllSelectListItems(): ListItemEntity[] {
    return this.currentListSelections.getSelectedItems(this.listViewerService.currentList.listItems);
  }

  getAllSelectListItemsItem(): ItemEntity[] {
    return this.getAllSelectListItems().map(listItem => listItem.item);
  }
  selectListItem(programItem: ListItemEntity) {
    this.currentListSelections.selectId(programItem.id);
    this.listViewerService.tellItemControlToDoItem(programItem, ITEM_OPERATIONS.SELECT);
    this.listViewerService.announceSingleSelection(programItem);
  }

  unselectListItem(programEntry: ListItemEntity) {
    this.currentListSelections.unselectId(programEntry.id);

    this.listViewerService.tellItemControlToDoItem(programEntry, ITEM_OPERATIONS.UNSELECT);

  }

  addListItem(programEntry: ListItemEntity) {
    this.currentListSelections.selectId(programEntry.id);
    this.listViewerService.tellItemControlToDoItem(programEntry, ITEM_OPERATIONS.ADD);
  }

  removeListItem(listItem: ListItemEntity) {
    this.currentListSelections.unselectId(listItem.id);

    this.listViewerService.tellItemControlToDoItem(listItem, ITEM_OPERATIONS.REMOVE);

  }

  doItem(clickListItemEvent: ClickListItemEvent) {
    const {listItem, event } = clickListItemEvent;
    // if multiple selection
    if (event.ctrlKey) {

      if (!this.currentListSelections.isItemIdSelected(listItem.id)) {
        this.addListItem(listItem);
      } else {
        this.removeListItem(listItem);
      }
    } else {
      if (!this.currentListSelections.isItemIdSelected(listItem.id)) {
        this.selectListItem(listItem);
      } else {
        this.unselectListItem(listItem);
      }
    }

  }

  invertListItemSelections() {
    this.currentListSelections.invertSelection(this.listViewerService.getAllCurrentListItemIds());
  }

  selectAllListItems() {
    this.currentListSelections.setManyIds(this.listViewerService.getAllCurrentListItemIds());
  }

  async syncWithZotero() {
    await this.listViewerService.syncWithZotero();
  }

  analyzePdfs() {

  }

}

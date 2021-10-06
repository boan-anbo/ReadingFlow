import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {Item} from '../../models/item';
import {ITEM_VIEWER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {NoFilePathError} from '../../exceptions/no-file-path-error';
import {ItemHasNoFileError} from '../../exceptions/item-has-no-file-error';
import {FileService} from '../../common/services/file.service';
import {FileViewerService} from '../../common/services/file-viewer.service';
import {HubQuickMessageService} from "../../common/services/hub-quick-message.service";
import {ITEM_OPERATIONS} from "../../consts/item-operations";
import {ItemEntity} from "../../common/backend/rf-client";

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(
    private log: LoggingService,
    private hub: HubService,
    private fileService: FileService,
    private fileViewerService: FileViewerService,
    private hubQuick: HubQuickMessageService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ITEM_SERVICE || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.itemHubMessageHandler);
  }

  itemHubMessageHandler = (message: HubMessage<any, ITEM_VIEWER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case ITEM_INSTRUCTIONS.DETECT_CHANGE:
      //   break;
      default:
        break;
    }
  };

  getItemFilePath(item: ItemEntity, currentFileIndex = 0) {

    if (item.itemFiles.length > 0) {
      currentFileIndex = 0;
    }
    if (this.isCurrentFileAvailable(item, currentFileIndex)) {
      const path = item.itemFiles[currentFileIndex].filePath;
      this.checkFilePath(path);
      return path;
    } else {
      throw new NoFilePathError(item.name);
    }
  }

  async openItemInContainer(item: ItemEntity, currentFileIndex = 0) {
    const path = this.getItemFilePath(item, currentFileIndex);
    await this.fileService.showFileInFolder(path);
  }

  async openItemInViewer(item: ItemEntity, currentFileIndex = 0) {
    const path = this.getItemFilePath(item, currentFileIndex);
    await this.fileViewerService.openFileWithDefaultViewer(path);
  }


  setRead() {

  }

  setUnread() {

  }


  isCurrentFileAvailable(item: ItemEntity, currentFileIndex = 0): boolean {
    return this.itemHasFiles(currentFileIndex) && (currentFileIndex <= item.itemFiles.length - 1);
  }

  private checkFilePath(filePath: string, itemName: string = '') {

    if (filePath === undefined) {
      throw new NoFilePathError(itemName);
    }
    return true;
  }

  private checkItemHasFiles(item: Item) {
    if (!this.itemHasFiles()) {
      throw new ItemHasNoFileError(item.name);
    }
  }

  private itemHasFiles(currentFileIndex: number = 0): boolean {
    return currentFileIndex > -1;
  }

  askItemControlToSelectItem(item: ItemEntity) {
    this.hubQuick.tellItemControlToDoItem(COMPONENTS.ITEM_SERVICE,  item, ITEM_OPERATIONS.SELECT)
  }

  askItemControlToUnselectItem(item: ItemEntity ) {
    this.hubQuick.tellItemControlToDoItem(COMPONENTS.ITEM_SERVICE, item, ITEM_OPERATIONS.SELECT)
  }
}

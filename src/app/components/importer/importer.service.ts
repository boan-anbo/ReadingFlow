import {Injectable} from '@angular/core';
import {ItemImporterService} from '../../common/services/item-importer.service';
import {ProjectService} from '../../common/services/project.service';
import {HubService} from '../../common/services/hub.service';
import {filter} from 'rxjs/operators';
import {PickedFile} from '../../models/picked-file';
import {LoggingService} from '../../core/services/logging/logging.service';
import {LIST_VIEWER_INSTRUCTIONS, PROGRAM_VIEWER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {ItemEntity, ListEntity} from '../../common/backend/rf-client';
import {WorkingStateService} from '../../common/services/working-state.service';
import {COMPONENTS} from '../../consts/components';
import {HubMessage} from "../../consts/hub-message";

@Injectable({
  providedIn: 'root'
})
export class ImporterService {
  list: ListEntity = null;
  pickedFiles: PickedFile [] = [];
  removeAddedFile = true;

  constructor(
    private itemImporterService: ItemImporterService,
    private projectService: ProjectService,
    private hub: HubService,
    private log: LoggingService,
    private state: WorkingStateService
  ) {
    this.hub.hubMessages.pipe(filter(message => message?.receiver === COMPONENTS.FILE_IMPORTER)).subscribe();
  }

  fileImporterHubMessagesHandler = (message: HubMessage<any>) => {
    switch (message.instruction) {
      default:
        return;
    }
  };

  // addFilesToProgram(filePaths: string[]) {
  //   const item = this.itemImporterService.filesToItems(filePaths);
  //   this.sendAddItemToProgramMessage(item);
  // }


  sendAddItemToProgramMessage(item: Promise<ItemEntity[]>) {
    this.hub.sendHubMessage<PROGRAM_VIEWER_INSTRUCTIONS>({
      instruction: PROGRAM_VIEWER_INSTRUCTIONS.ADD_ITEMS_TO_PROGRAM,
      sender: COMPONENTS.FILE_IMPORTER,
      receiver: COMPONENTS.PROGRAM_VIEWER,
      payload: item
    });
  }

  sendAddItemToListMessage(filePaths: string []) {
    this.hub.sendHubMessage<LIST_VIEWER_INSTRUCTIONS>({
      instruction: LIST_VIEWER_INSTRUCTIONS.ADD_FILES_TO_LIST,
      sender: COMPONENTS.FILE_IMPORTER,
      receiver: COMPONENTS.LIST_VIEWER,
      payload: filePaths
    });
  }

  addSelectedFilesToCurrentList(filePaths: string[]) {
    const items = this.itemImporterService.filesToItems(filePaths);
    // items.forEach(item => this.projectService.addItemToList(item, this.list));
    this.removeSelected();
  }

  getAllPickedFiles(): PickedFile[] {
    return this.pickedFiles;
  }

  getAllPickedFilePaths(): string[] {
    return this.pickedFiles.map(file => file.filePath);
  }

  getSelectedPickedFiles(): PickedFile[] {
    return this.pickedFiles.filter(file => file.selected);
  }

  getSelectedPickedFilePaths(): string[] {
    return this.getSelectedPickedFiles().map(file => file.filePath);
  }

  addSelectedToProgram() {
    // this.addFilesToProgram(this.getSelectedPickedFilePaths());
    // this.removeSelected();
  }

  removeSelected() {
    this.pickedFiles = this.pickedFiles.filter(file => !file.selected);
  }

  removeUnselected() {
    this.pickedFiles = this.pickedFiles.filter(file => file.selected);
  }

  selectAll() {
    this.log.info('To select all picked files');
    this.pickedFiles.forEach(file => {
      if (file.selected === false) {
        file.selected = true;
      }
    });
  }

  allSelected() {
    return this.pickedFiles.every(file => file.selected === true);
  }

  invertSelect() {
    this.pickedFiles.forEach(file => file.selected = !file.selected);
  }

  async addSelectedToList() {

    await this.addFilesToList(this.getSelectedPickedFilePaths());
    this.removeSelected();
  }


  async addFilesToList(filePaths: string[]) {
    this.state.checkIfListAvailableOrThrow();
    // const receivedItems = await this.itemImporterService.filesToItems(filePaths);
    this.sendAddItemToListMessage(filePaths);
  }
}

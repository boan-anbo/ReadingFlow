import {Component, OnInit} from '@angular/core';
import {ProgramViewerService} from './program-viewer.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {FileImportExportService} from '../../common/services/file-import-export.service';
import {ItemEntity, ProgramItemEntity} from "../../common/backend/rf-client";
import {ITEM_OPERATIONS} from "../../consts/item-operations";
import {WorkingStateService} from "../../common/services/working-state.service";

@Component({
  selector: 'app-program',
  templateUrl: './program-viewer.component.html',
  styleUrls: ['./program-viewer.component.scss'],
})
export class ProgramViewerComponent implements OnInit {

  constructor(
    public programViewerService: ProgramViewerService,
    private translate: TranslateService,
    private log: LoggingService,
    private fileImportExportService: FileImportExportService,
    public state: WorkingStateService
  ) {
  }

  ngOnInit(): void {
    this.log.info('ProgramComponent INIT');
  }


  addBreak(duration?: number) {

  }

  async saveProgramToFile() {
    await this.fileImportExportService.saveProgramToFile(this.programViewerService.program);
  }

  async loadProgramToFile() {
    this.programViewerService.program = await this.fileImportExportService.loadFileToProgram();
  }

  addAllItemsToList() {
    this.programViewerService.addAllItemsToList();
  }

  getProgramItemSelections() {
    return this.programViewerService.programItemSelections;
  }

  trackBy = (index, item: ProgramItemEntity) => {
    return item.id;
  }

  isReading(programItem: ProgramItemEntity) {

    return this.state.currentReadingItem?.id === programItem.id;
  }


  onItemDelete(item: ItemEntity) {
    // this.programViewerService.deleteProgramItem(item);
  }

  selectProgramItem(programItem: ProgramItemEntity) {
    this.programViewerService.programItemSelections.setId(programItem.id);
    this.programViewerService.tellItemControlToDoItem(programItem, ITEM_OPERATIONS.SELECT);
    // this.programViewerService.unselectAllEntriesExcept(programItem);
  }

  unselectProgramItem(programEntry: ProgramItemEntity) {
    this.programViewerService.programItemSelections.unselectId(programEntry.id);

    this.programViewerService.tellItemControlToDoItem(programEntry, ITEM_OPERATIONS.UNSELECT);

  }

  addProgramItem(programEntry: ProgramItemEntity) {
    this.programViewerService.programItemSelections.selectId(programEntry.id);
    this.programViewerService.tellItemControlToDoItem(programEntry, ITEM_OPERATIONS.ADD);
  }

  removeProgramItem(programEntry: ProgramItemEntity) {
    this.programViewerService.programItemSelections.unselectId(programEntry.id);

    this.programViewerService.tellItemControlToDoItem(programEntry, ITEM_OPERATIONS.REMOVE);

  }

  doItem(entry: ProgramItemEntity, event: MouseEvent) {
    // if multiple selection
    if (event.ctrlKey) {

      if (!this.programViewerService.programItemSelections.isItemIdSelected(entry.id)) {
        this.addProgramItem(entry);
      } else {
        this.removeProgramItem(entry);
      }
    } else {
      if (!this.programViewerService.programItemSelections.isItemIdSelected(entry.id)) {
      this.selectProgramItem(entry);
      } else {
        this.unselectProgramItem(entry);
      }
    }

  }

  readSelectedProgramItem(programItem: ProgramItemEntity, $event: MouseEvent) {
    $event.stopPropagation();
     this.programViewerService.currentEntryIndex = this.programViewerService.getProgramItemIndexById(programItem.id);

     this.programViewerService.readNext()
  }

  async deleteProgram() {
    await this.programViewerService.deleteProgram();

  }
}

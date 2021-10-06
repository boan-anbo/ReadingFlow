import {Injectable} from '@angular/core';
import {FileService} from "./file.service";
import {List} from "../../models/list";
import {LoggingService} from "../../core/services/logging/logging.service";
import {ProgramBreak} from "../../models/program-break";
import {ProgramItem} from "../../models/program-item";
import {PROGRAM_ENTRY_TYPE} from "../../models/program-entry-type";
import {ListEntity, ProgramEntity} from "../backend/rf-client";

@Injectable({
  providedIn: 'root'
})
export class FileImportExportService {

  constructor(
    private fileService: FileService,
    private log: LoggingService
  ) {
  }

  async saveListToFile(list: ListEntity) {
    const savePath = await this.fileService.pickOneListFileToWrite();
    const listString = JSON.stringify(list);
    this.fileService.writeDataToFile(listString, savePath);
  }

  async loadFileToList(): Promise<ListEntity> {
    const openPath = await this.fileService.pickOneListFileToOpen();
    const listString = await this.fileService.readDataFromFile(openPath);
    const list = Object.assign(new List(''), JSON.parse(listString));
    this.log.info(`List File Loaded from ${openPath}`, list);
    return list;
  }

  async saveProgramToFile(program: ProgramEntity): Promise<void> {
    const savePath = await this.fileService.pickOneProgramFileToWrite();
    const listString = JSON.stringify(program);
    this.fileService.writeDataToFile(listString, savePath);
  }

  async loadFileToProgram(): Promise<ProgramEntity> {
    const openPath = await this.fileService.pickOneProgramFileToOpen();
    const programEntriesString = await this.fileService.readDataFromFile(openPath);
    const program = JSON.parse(programEntriesString);
    this.log.info(`List File Loaded from ${openPath}`, program);
    return program.map(item => {
        if (item?.type === PROGRAM_ENTRY_TYPE.PROGRAM_ITEM) {
          return ProgramItem.fromJson(item);
        } else {
          return item
        }
      }
    );
  }
}

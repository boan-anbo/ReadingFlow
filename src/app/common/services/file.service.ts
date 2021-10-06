import {Injectable} from '@angular/core';
import {TauriService} from '../../core/services';
import {
  FILE_DIALOG_FILTER_JSON,
  FILE_DIALOG_FILTER_LIST,
  FILE_DIALOG_FILTER_PDF,
  FILE_DIALOG_FILTER_PROGRAM
} from '../../consts/file-dialog-filters';
import {SettingsService} from './settings.service';
import {LoggingService} from '../../core/services/logging/logging.service';
import {getPathDirectoryPath} from "../../../../lib-js/file-purejs";
import {dialog, shell} from "@tauri-apps/api";

/**
 * Pure file operations.
 */
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private es: TauriService,
    private settings: SettingsService,
    private log: LoggingService
  ) {
  }

  async pickMultiplePdfFiles(): Promise<string[]> {

    const results = await dialog.open({
      directory: false,
      defaultPath: this.settings.settings.defaultOpenPdfLocation ?? null,
      multiple: true,

      filters: [FILE_DIALOG_FILTER_PDF],
    });

    console.log("You picked")

    this.updateDefaultPdfLocation(results as string[]);
    return results as string[];
  }

  updateDefaultPdfLocation(resultPaths: string []) {

    if (resultPaths?.length > 0) {
      const firstPath = resultPaths[0];
      this.settings.updateDefaultPdfOpenDirectory(getPathDirectoryPath(firstPath));
    }
  }

  async pickOnePdfFile(): Promise<string> {

    const results = await dialog.open({
      directory: false,
      defaultPath: this.settings.settings.defaultOpenPdfLocation ?? null,
      multiple: false,
      filters: [FILE_DIALOG_FILTER_PDF]
    });
    return results as string;
  }

  // @ts-ignore
  async pickOneJsonFileToOpen(): Promise<string> {

    // const results = await this.es.remote.dialog.showOpenDialog(this.es.remote.getCurrentWindow(), {
    //   properties: ['openFile'],
    //   filters: [FILE_DIALOG_FILTER_JSON]
    // });
    // return results.filePaths[0];
  }

  // @ts-ignore
  async pickOneListFileToOpen(): Promise<string> {

    // const results = await this.es.remote.dialog.showOpenDialog(this.es.remote.getCurrentWindow(), {
    //   properties: ['openFile'],
    //   filters: [FILE_DIALOG_FILTER_LIST]
    // });
    // return results.filePaths[0];
  }

  // @ts-ignore
  async pickOneProgramFileToOpen(): Promise<string> {

    // const results = await this.es.remote.dialog.showOpenDialog(this.es.remote.getCurrentWindow(), {
    //   properties: ['openFile'],
    //   filters: [FILE_DIALOG_FILTER_PROGRAM]
    // });
    // return results.filePaths[0];
  }

  // @ts-ignore
  async pickOneListFileToWrite(): Promise<string> {
    // const results = await this.es.remote.dialog.showSaveDialog(this.es.remote.getCurrentWindow(), {
    //   properties: ['showOverwriteConfirmation'],
    //   filters: [FILE_DIALOG_FILTER_LIST]
    // });
    // return results.filePath;
  }

  // @ts-ignore
  async pickOneProgramFileToWrite(): Promise<string> {
    // const results = await this.es.remote.dialog.showSaveDialog(this.es.remote.getCurrentWindow(), {
    //   properties: ['showOverwriteConfirmation'],
    //   filters: [FILE_DIALOG_FILTER_PROGRAM]
    // });
    // return results.filePath;
  }

  // @ts-ignore
  async pickOneDirectory(): Promise<string> {

    // const results = await this.es.remote.dialog.showOpenDialog(this.es.remote.getCurrentWindow(), {
    //   properties: ['openDirectory', 'createDirectory'],
    // });
    // return results.filePaths[0];
  }

  async showFileInFolder(filepath: string) {
    // this.es.remote.shell.showItemInFolder(filePath);

    await shell.open(filepath);
  }

  async openFileWithDefaultSetting(filepath: string) {

    await shell.open(filepath);
  }

  writeDataToFile(data: any, filePath) {
    // this.es.fs.writeFile(filePath, data, () => {
    //   this.log.info('File written to', filePath);
    // });
  }

  async readDataFromFile(openPath: string): Promise<any> {
    // const data = await this.es.fs.promises.readFile(openPath);
    // return data;
  }
}

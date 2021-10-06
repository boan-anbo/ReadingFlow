import {Injectable} from '@angular/core';
import {SettingsService} from './settings.service';
import {ItemFileService} from './item-file.service';
import {ItemFileTypes} from '../../models/item-file-types';
import {FileViewer} from '../../consts/settings';
import {OsTypes} from '../../consts/os-types';
import {TauriService} from '../../core/services';
import {LoggingService} from '../../core/services/logging/logging.service';
import {os, shell} from '@tauri-apps/api';
import {Command} from "@tauri-apps/api/shell";

@Injectable({
  providedIn: 'root'
})
export class FileViewerService {

  constructor(
    private settings: SettingsService,
    private itemFileService: ItemFileService,
    private es: TauriService,
    private log: LoggingService
  ) {
  }


  async openFileWithDefaultViewer(targetFilePath: string) {
    let viewer: FileViewer = null;
    const fileType = await this.itemFileService.pathToFileType(targetFilePath);
    switch (fileType) {
      case ItemFileTypes.DOC:
        viewer = this.settings.settings.defaultDocViewer;
        break;
      case ItemFileTypes.EPUB:
        viewer = this.settings.settings.defaultEpubViewer;
        break;
      case ItemFileTypes.PDF:
        viewer = this.settings.settings.defaultPdfViewer;
        break;
    }
    this.log.info(`opening ${fileType} file: ${targetFilePath} with ${JSON.stringify(viewer)}`);
    const commands = this.getShellCommandArrayForViewer(targetFilePath, viewer, this.es.myOs);
    await this.viewFile(commands);
  }

  async viewFile(commands: string[]): Promise<void> {
    const firstCmd = commands.shift();
    this.log.info('Executing shell command', firstCmd + ' ' + commands.join(' '));
    const openCommand = new Command(firstCmd, commands);
    const process = await openCommand.spawn();
    console.log("Spawned Process for open comment", process, firstCmd, commands)
  }

  private getShellCommandArrayForViewer(targetFilePath: string, viewer: FileViewer, os: OsTypes): string[] {
    const {viewerPath, viewerName, defaultArguments} = viewer;
    switch (os) {
      case OsTypes.WIN:
        return [viewerPath, targetFilePath, ...defaultArguments];
      default:
        return [];
    }
  }

}


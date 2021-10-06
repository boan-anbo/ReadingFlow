import { Injectable } from '@angular/core';
import {LoggingService} from "../../core/services/logging/logging.service";
import {Settings} from "../../consts/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = new Settings();
  constructor(
    private log: LoggingService
  ) { }

  updateDefaultPdfOpenDirectory(newDirectoryPath: string) {
    this.log.info("Updating Default pdf open directory", newDirectoryPath);
  }
}

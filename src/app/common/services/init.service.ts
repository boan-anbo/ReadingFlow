import { Injectable } from '@angular/core';
import {ElectronLibrariesService} from "../../core/services/electron/electron-libraries.service";
import {LoggingService} from "../../core/services/logging/logging.service";
import {FileService} from "./file.service";
import {ShortcutService} from "./shortcut.service";
import {RfServerService} from "./rf-server.service";
import {SignalrService} from "../backend/signalr.service";
import {ElectronMonitorService} from "./electron-monitor.service";
import {checkTauriCommands} from "../backend/tauriCommands";

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private els: ElectronLibrariesService,
    private log: LoggingService,
    private file: FileService,
    private shortcut: ShortcutService,
    private backend: RfServerService,
    private signalR: SignalrService,
    private esr: ElectronMonitorService
  ) { }

  async init() {
    await this.checkTauri();
    this.log.info('Initiating all dependencies');
    await this.els.loadThirdPartyLibraries();
    await this.esr.init();
    await this.backend.startServer();

    this.afterInit();
    await this.signalR.initiateSignalrConnection();
  }

  afterInit() {
  }

  async checkTauri() {
    await checkTauriCommands();
  }
}

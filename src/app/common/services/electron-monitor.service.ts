import { Injectable } from '@angular/core';
import {TauriService} from '../../core/services';
import {IpcRendererManagerService} from '../../core/services/electron/ipc-renderer-manager.service';
import {IpcEvents} from '../../../../app/shared/ipc-events';
import {LoggingService} from '../../core/services/logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronMonitorService {

  constructor(
    private es: TauriService,
    private log: LoggingService
  ) { }

  async init() {
    this.log.info('Attaching Electron Monitor Listeners');
    // this.es.ipcRenderer.on(IpcEvents.NOTIFY_RF_SERVER_STARTED,  this.listenToServerStarted);
  }

  listenToServerStarted = (event, args) => {
    this.log.info('Server has started at port', args);
  };
}

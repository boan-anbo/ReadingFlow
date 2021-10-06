import {Injectable} from '@angular/core';
import {IpcRendererManagerService} from "./ipc-renderer-manager.service";
import {LoggingService} from "../logging/logging.service";
import {TauriService} from "./tauri.service";
import {IpcEvents} from "../../../../../app/shared/ipc-events";

@Injectable({
  providedIn: 'root'
})
export class IpcRendererEventsRegistrationService {

  constructor(
    private ipcRendererManager: IpcRendererManagerService,
    private log: LoggingService,
    private es: TauriService
  ) {
    if (es.isElectron) {
      this.registerAll();
    }
  }


  registerAll() {
    this.registerOne(IpcEvents.EXAMPLE_RENDERER_ACTION, (event, args) => this.exampleRendererAction(args));
  }

  registerOne(channelName: string, listeners: (...args: any[]) => void) {

    this.ipcRendererManager.removeAllListeners(channelName);
    this.ipcRendererManager.on(channelName, listeners);
  }

  exampleRendererAction(args) {
    this.log.info(`Renderer Received Arguments ${JSON.stringify(args)} from Main for action ${IpcEvents.EXAMPLE_RENDERER_ACTION}`)
  }
}

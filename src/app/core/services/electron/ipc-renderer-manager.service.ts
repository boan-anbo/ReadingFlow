import {Injectable} from '@angular/core';
import {TauriService} from './tauri.service';
import {EventEmitter} from 'events';
import {IpcEvents, ipcRendererEvents} from '../../../../../app/shared/ipc-events';

@Injectable({
  providedIn: 'root'
})
export class IpcRendererManagerService extends EventEmitter {

  constructor(private es: TauriService) {
    super();
    ipcRendererEvents.forEach((name) => {
    })
  }

  /**
   * Central method to send an IPC message to the main process.
   * Currently very simple, but centralized here so that future
   * refactors will be a lot easier.
   *
   * @param channel
   * @param args
   * @memberof IpcRendererManager
   */
  public send(channel: IpcEvents, ...args: Array<any>) {
    // this.es.ipcRenderer.send(channel, ...args);
  }

  public invoke(channel: IpcEvents, ...args: Array<any>) {
    // return this.es.ipcRenderer.invoke(channel, ...args);
  }
}

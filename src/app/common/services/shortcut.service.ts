import {Injectable} from '@angular/core';
import {LoggingService} from "../../core/services/logging/logging.service";
import {TauriService} from "../../core/services";
import {ReadingControlService} from "../../components/reading-control/reading-control.service";

@Injectable({
  providedIn: 'root'
})
export class ShortcutService {

  constructor(
    private log: LoggingService,
    private es: TauriService,
    private control: ReadingControlService
  ) {
    // if (this.es.isElectron) {
    //   this.register()
    // }
  }

  register() {
    // this.es.remote.globalShortcut.unregisterAll();
    // this.es.remote.globalShortcut.register('CmdOrCtrl+Shift+Alt+X', this.activateWindow);
    // this.es.remote.globalShortcut.register('CmdOrCtrl+Shift+Alt+N', this.readNext);
  }


  activateWindow = () => {
    // this.log.info("Shortcut activate current window")
    // this.es.remote.getCurrentWindow().focus();
  }
  // readNext = () => {
    // this.control.readNext();
  // }
}

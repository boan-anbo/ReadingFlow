import {Injectable} from '@angular/core';
import {TauriService} from './tauri.service';
import {LoggingService} from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronLibrariesService {

  constructor(private es: TauriService, private log: LoggingService) {
  }

  async loadThirdPartyLibraries() {

    if (this.es.isElectron) {
      // 3rd party
      this.log.info('Loading 3rd Party Electron Libraries...');
      // this.es.knex = window.require('knex');
      // if (this.es.knex) {
      //   this.log.info('Knex loaded.');
      // }
    } else {
      this.log.warn('Web mode. Skipping importing Electron libraries.');
    }
  }
}

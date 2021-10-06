import {Injectable} from '@angular/core';
import {OsTypes} from "../../../consts/os-types";

import {os} from '@tauri-apps/api';

@Injectable({
  providedIn: 'root'
})
export class TauriService {
  // ipcRenderer: typeof ipcRenderer;
  // webFrame: typeof webFrame;
  // remote: typeof remote;
  // childProcess: typeof childProcess;
  // // fs: typeof fs;
  // path: typeof path;
  // log: typeof log | Console;
  myOs: OsTypes;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // unconditional imports


    // Conditional imports
    // if (this.isElectron) {
    //   console.warn('Electron Mode');
    //   this.ipcRenderer = window.require('electron').ipcRenderer;
    //   this.webFrame = window.require('electron').webFrame;
    //
    //   this.childProcess = window.require('child_process');
    //   // this.fs = window.require('fs');
    //   this.path = window.require('path');
    //
    //
    //   // If you want to use a NodeJS 3rd party deps in Renderer process (like @electron/remote),
    //   // it must be declared in dependencies of both package.json (in root and app folders)
    //   // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
    //   this.remote = window.require('@electron/remote');
    //   console.log('Service Remote', this.remote);
    //
    //
    //   this.log = window.require('electron-log');
    //
    //
    //   // const end = process.hrtime(start)
    //   // console.log("Prisma Loaded", end)
    //   //
    //   // console.log("Prisma Client:", PrismaClient)
    //
    //   // const { PrismaClient } = window.require('.prisma/client');
    //   // this.prisma =  new PrismaClient()
      this.loadOsInfo();
    //
    // } else {
    //
    //   console.warn('Web Mode:\nThis mode does not have access to Electron/node libraries.');
    //   // todo provide logger for web mode.
    //   this.log = console;
    // }

  }

  async loadOsInfo() {

    this.myOs = await this.getOs();
    console.info(`You are using ${this.myOs}`);
  }
  //
  async getOs(): Promise<OsTypes> {
    const osStr = await os.platform();
    console.warn("Tauri Os info", osStr)
    switch (osStr.toLowerCase()) {
      case 'darwin':
        return OsTypes.MAC;
      case 'linux':
        return OsTypes.LINUX;
      case 'windows':
        return OsTypes.WIN;
      default:
        return OsTypes.OTHER;
    }
  }


}

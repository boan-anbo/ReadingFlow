import {ipcMainManager} from "./ipc";
import {IpcEvents} from "./shared/ipc-events";
import {BrowserWindow} from 'electron';
import {browserWindows} from "./windows";

export function setupExampleListeners() {
  ipcMainManager.handle(IpcEvents.EXAMPLE_MAIN_ACTION, () => {
    // BrowserWindow.getFocusedWindow()
    // ipcRenderer.invoke(IpcEvents.OPEN_SETTINGS)
    BrowserWindow.getFocusedWindow().webContents.send(IpcEvents.EXAMPLE_RENDERER_ACTION, {arg: "FUck"})
    return `Response to ${IpcEvents.EXAMPLE_MAIN_ACTION}`;
  })
}

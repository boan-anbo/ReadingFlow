/**
 * Ensures that we're listening to file events
 */
import {ipcMainManager} from "./ipc";
import {IpcEvents} from "./shared/ipc-events";
import * as os from "os";

export function setupCore() {
  ipcMainManager.handle(IpcEvents.CORE_GET_OS_TYPE, async () => {
    // showSaveDialog();
    return await getOsType();

  });
}

/**
 * Shows the "Open Fiddle" dialog and forwards
 * the path to the renderer
 */

export const getOsType = (): string => {
  return os.type();
}

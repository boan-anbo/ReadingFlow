"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupExampleListeners = void 0;
var ipc_1 = require("./ipc");
var ipc_events_1 = require("./shared/ipc-events");
var electron_1 = require("electron");
function setupExampleListeners() {
    ipc_1.ipcMainManager.handle(ipc_events_1.IpcEvents.EXAMPLE_MAIN_ACTION, function () {
        // BrowserWindow.getFocusedWindow()
        // ipcRenderer.invoke(IpcEvents.OPEN_SETTINGS)
        electron_1.BrowserWindow.getFocusedWindow().webContents.send(ipc_events_1.IpcEvents.EXAMPLE_RENDERER_ACTION, { arg: "FUck" });
        return "Response to " + ipc_events_1.IpcEvents.EXAMPLE_MAIN_ACTION;
    });
}
exports.setupExampleListeners = setupExampleListeners;
//# sourceMappingURL=test.js.map
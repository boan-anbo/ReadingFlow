"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateMainWindow = exports.createMainWindow = exports.getMainWindowOptions = exports.browserWindows = void 0;
var electron_1 = require("electron");
var ipc_events_1 = require("./shared/ipc-events");
var context_menu_1 = require("./context-menu");
var ipc_1 = require("./ipc");
var path = require("path");
// Keep a global reference of the window objects, if we don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
exports.browserWindows = [];
/**
 * Gets default options for the main window
 *
 * @returns {Electron.BrowserWindowConstructorOptions}
 */
function getMainWindowOptions() {
    return {
        width: 1200,
        height: 900,
        minHeight: 600,
        minWidth: 600,
        titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
        acceptFirstMouse: true,
        backgroundColor: '#1d2427',
        webPreferences: {
            webviewTag: false,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, '..', 'preload', 'preload'),
        },
    };
}
exports.getMainWindowOptions = getMainWindowOptions;
/**
 * Creates a new main window.
 *
 * @export
 * @returns {Electron.BrowserWindow}
 */
function createMainWindow() {
    console.log("Creating main window");
    var browserWindow;
    browserWindow = new electron_1.BrowserWindow(getMainWindowOptions());
    browserWindow.loadFile('./dist/static/index.html');
    browserWindow.webContents.once('dom-ready', function () {
        if (browserWindow) {
            browserWindow.show();
            context_menu_1.createContextMenu(browserWindow);
        }
    });
    browserWindow.on('focus', function () {
        if (browserWindow) {
            ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.SET_SHOW_ME_TEMPLATE);
        }
    });
    browserWindow.on('closed', function () {
        exports.browserWindows = exports.browserWindows.filter(function (bw) { return browserWindow !== bw; });
        browserWindow = null;
    });
    browserWindow.webContents.on('new-window', function (event, url) {
        event.preventDefault();
        electron_1.shell.openExternal(url);
    });
    browserWindow.webContents.on('will-navigate', function (event, url) {
        event.preventDefault();
        electron_1.shell.openExternal(url);
    });
    ipc_1.ipcMainManager.on(ipc_events_1.IpcEvents.SHOW_INACTIVE, function () {
        if (browserWindow) {
            browserWindow.showInactive();
        }
    });
    ipc_1.ipcMainManager.handle(ipc_events_1.IpcEvents.GET_APP_PATHS, function () {
        var paths = {};
        var pathsToQuery = [
            'home',
            'appData',
            'userData',
            'temp',
            'downloads',
            'desktop',
        ];
        for (var _i = 0, pathsToQuery_1 = pathsToQuery; _i < pathsToQuery_1.length; _i++) {
            var path_1 = pathsToQuery_1[_i];
            paths[path_1] = electron_1.app.getPath(path_1);
        }
        return paths;
    });
    exports.browserWindows.push(browserWindow);
    return browserWindow;
}
exports.createMainWindow = createMainWindow;
/**
 * Gets or creates the main window, returning it in both cases.
 *
 * @returns {Electron.BrowserWindow}
 */
function getOrCreateMainWindow() {
    return (electron_1.BrowserWindow.getFocusedWindow() || exports.browserWindows[0] || createMainWindow());
}
exports.getOrCreateMainWindow = getOrCreateMainWindow;
//# sourceMappingURL=windows.js.map
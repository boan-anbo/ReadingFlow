"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextMenu = exports.getInspectItems = exports.getMonacoItems = exports.getRunItems = void 0;
var electron_1 = require("electron");
var ipc_events_1 = require("./shared/ipc-events");
var ipc_1 = require("./ipc");
/**
 * Returns items related to running the current fiddle.
 *
 * @returns {Array<MenuItemConstructorOptions>}
 */
function getRunItems() {
    return [
        {
            id: 'run',
            label: 'Run Fiddle',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FIDDLE_RUN); },
        },
        {
            id: 'clear_console',
            label: 'Clear Console',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.CLEAR_CONSOLE); },
        },
        {
            type: 'separator',
        },
    ];
}
exports.getRunItems = getRunItems;
/**
 * Possibly returns items interacting with the Monaco editor.
 * Our check for "are we in the Monaco editor" is pretty crude -
 * we just assume that we are if we can paste text.
 *
 * @param {BrowserWindow} browserWindow
 * @param {ContextMenuParams} { x, y }
 * @returns {Array<MenuItemConstructorOptions>}
 */
function getMonacoItems(_a) {
    var pageURL = _a.pageURL, editFlags = _a.editFlags;
    if (!editFlags.canPaste || !/.*index\.html(#?)$/.test(pageURL || '')) {
        return [];
    }
    return [
        {
            id: 'go_to_definition',
            label: 'Go to Definition',
            click: function () {
                var cmd = ['editor.action.revealDefinition'];
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_EXECUTE_COMMAND, cmd);
            },
        },
        {
            id: 'peek_definition',
            label: 'Peek Definition',
            click: function () {
                var cmd = ['editor.action.peekDefinition'];
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_EXECUTE_COMMAND, cmd);
            },
        },
        {
            id: 'references',
            label: 'Find References',
            click: function () {
                var cmd = ['editor.action.referenceSearch.trigger'];
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_EXECUTE_COMMAND, cmd);
            },
        },
        { type: 'separator' },
        {
            id: 'palette',
            label: 'Command Palette',
            click: function () {
                var cmd = ['editor.action.quickCommand'];
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_EXECUTE_COMMAND, cmd);
            },
        },
        { type: 'separator' },
        {
            id: 'format_document',
            label: 'Format Document',
            click: function () {
                var cmd = ['editor.action.formatDocument'];
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_EXECUTE_COMMAND, cmd);
            },
        },
        {
            id: 'format_selection',
            label: 'Format Selection',
            click: function () {
                var cmd = ['editor.action.formatSelection'];
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_EXECUTE_COMMAND, cmd);
            },
        },
        { type: 'separator' },
    ];
}
exports.getMonacoItems = getMonacoItems;
/**
 * Possibly returns the `Inspect Element` item.
 *
 * @param {BrowserWindow} browserWindow
 * @param {ContextMenuParams} { x, y }
 * @returns {Array<MenuItemConstructorOptions>}
 */
function getInspectItems(browserWindow, _a) {
    var x = _a.x, y = _a.y;
    return [
        {
            id: 'inspect',
            label: 'Inspect Element',
            click: function () {
                var _a;
                browserWindow.webContents.inspectElement(x, y);
                try {
                    if (browserWindow.webContents.isDevToolsOpened()) {
                        (_a = browserWindow.webContents.devToolsWebContents) === null || _a === void 0 ? void 0 : _a.focus();
                    }
                }
                catch (error) {
                    console.warn("Tried to focus dev tools, but failed", { error: error });
                }
            },
        },
    ];
}
exports.getInspectItems = getInspectItems;
/**
 * Creates a context menu for a given BrowserWindow
 *
 * @param {BrowserWindow} browserWindow
 */
function createContextMenu(browserWindow) {
    browserWindow.webContents.on('context-menu', function (_event, props) {
        var editFlags = props.editFlags;
        var template = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getRunItems()), getMonacoItems(props)), [
            {
                id: 'cut',
                label: 'Cut',
                role: 'cut',
                enabled: editFlags.canCut,
            },
            {
                id: 'copy',
                label: 'Copy',
                role: 'copy',
                enabled: editFlags.canCopy,
            },
            {
                id: 'paste',
                label: 'Paste',
                role: 'paste',
                enabled: editFlags.canPaste,
            },
            {
                type: 'separator',
            }
        ]), getInspectItems(browserWindow, props));
        var menu = electron_1.Menu.buildFromTemplate(template);
        menu.popup({});
    });
}
exports.createContextMenu = createContextMenu;
//# sourceMappingURL=context-menu.js.map
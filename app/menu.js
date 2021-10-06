"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMenu = void 0;
var electron_1 = require("electron");
var ipc_events_1 = require("../shared/ipc-events");
var templates_1 = require("../shared/templates");
var files_1 = require("./files");
var ipc_1 = require("./ipc");
var windows_1 = require("./windows");
/**
 * Is the passed object a constructor for an Electron Menu?
 *
 * @param {(Array<Electron.MenuItemConstructorOptions> | Electron.Menu)} [submenu]
 * @returns {submenu is Array<Electron.MenuItemConstructorOptions>}
 */
function isSubmenu(submenu) {
    return !!submenu && Array.isArray(submenu);
}
/**
 * Returns additional items for the help menu
 *
 * @returns {Array<Electron.MenuItemConstructorOptions>}
 */
function getHelpItems() {
    var items = [];
    items.push({
        type: 'separator',
    }, {
        label: 'Show Welcome Tour',
        click: function () {
            ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.SHOW_WELCOME_TOUR);
        },
    }, {
        type: 'separator',
    }, {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+Option+i',
        click: function () {
            var browserWindow = electron_1.BrowserWindow.getFocusedWindow();
            if (browserWindow && !browserWindow.isDestroyed()) {
                browserWindow.webContents.toggleDevTools();
            }
        },
    }, {
        type: 'separator',
    }, {
        label: 'Open Fiddle Repository...',
        click: function () {
            electron_1.shell.openExternal('https://github.com/electron/fiddle');
        },
    }, {
        label: 'Open Electron Repository...',
        click: function () {
            electron_1.shell.openExternal('https://github.com/electron/electron');
        },
    }, {
        label: 'Open Electron Issue Tracker...',
        click: function () {
            electron_1.shell.openExternal('https://github.com/electron/electron/issues');
        },
    });
    // on macOS, there's already the About Electron Fiddle menu item
    // under the first submenu set by the electron-default-menu package
    if (process.platform !== 'darwin') {
        items.push({
            type: 'separator',
        }, {
            label: 'About Electron Fiddle',
            click: function () {
                electron_1.app.showAboutPanel();
            },
        });
    }
    return items;
}
/**
 * Depending on the OS, the `Preferences` either go into the `Fiddle`
 * menu (macOS) or under `File` (Linux, Windows)
 *
 * @returns {Array<Electron.MenuItemConstructorOptions>}
 */
function getPreferencesItems() {
    return [
        {
            type: 'separator',
        },
        {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+,',
            click: function () {
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.OPEN_SETTINGS);
            },
        },
        {
            type: 'separator',
        },
    ];
}
/**
 * Returns the Exit items
 *
 * @returns {Array<Electron.MenuItemConstructorOptions>}
 */
function getQuitItems() {
    return [
        {
            type: 'separator',
        },
        {
            role: 'quit',
        },
    ];
}
/**
 * Returns the top-level "File" menu
 *
 * @returns {Array<Electron.MenuItemConstructorOptions>}
 */
function getTasksMenu() {
    var tasksMenu = [
        {
            label: 'Run Fiddle...',
            accelerator: 'F5',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FIDDLE_RUN); },
        },
        {
            label: 'Package Fiddle...',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FIDDLE_PACKAGE); },
        },
        {
            label: 'Make installers for Fiddle...',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FIDDLE_MAKE); },
        },
    ];
    return {
        label: 'Tasks',
        submenu: tasksMenu,
    };
}
function getShowMeMenuItem(key, activeKey, item) {
    if (typeof item === 'string') {
        return {
            label: key,
            type: 'radio',
            checked: key === activeKey,
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FS_OPEN_TEMPLATE, [key]); },
        };
    }
    return {
        label: key,
        submenu: Object.keys(item).map(function (subkey) {
            return getShowMeMenuItem(subkey, activeKey, item[subkey]);
        }),
    };
}
function getShowMeMenu(activeTemplate) {
    var showMeMenu = Object.keys(templates_1.SHOW_ME_TEMPLATES).map(function (key) {
        return getShowMeMenuItem(key, activeTemplate, templates_1.SHOW_ME_TEMPLATES[key]);
    });
    return {
        label: 'Show Me',
        submenu: showMeMenu,
    };
}
/**
 * Returns the top-level "File" menu
 *
 * @returns {Array<Electron.MenuItemConstructorOptions>}
 */
function getFileMenu(acceleratorsToBlock) {
    if (acceleratorsToBlock === void 0) { acceleratorsToBlock = []; }
    var fileMenu = [
        {
            label: 'New Fiddle',
            click: function () {
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.CLEAR_CONSOLE);
                return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FS_NEW_FIDDLE);
            },
            accelerator: 'CmdOrCtrl+N',
        },
        {
            label: 'New Test',
            click: function () {
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.CLEAR_CONSOLE);
                return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FS_NEW_TEST);
            },
            accelerator: 'CmdOrCtrl+T',
        },
        {
            label: 'New Window',
            click: function () { return windows_1.createMainWindow(); },
            accelerator: 'CmdOrCtrl+Shift+N',
        },
        {
            type: 'separator',
        },
        {
            label: 'Open',
            click: files_1.showOpenFilesDialog,
            accelerator: 'CmdOrCtrl+O',
        },
        {
            label: 'Open Recent',
            role: 'recentDocuments',
            submenu: [
                {
                    label: 'Clear Recent',
                    role: 'clearRecentDocuments',
                },
            ],
        },
        {
            type: 'separator',
        },
        {
            label: 'Save',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FS_SAVE_FIDDLE); },
            accelerator: !acceleratorsToBlock.includes("save" /* save */)
                ? 'CmdOrCtrl+S'
                : undefined,
        },
        {
            label: 'Save as',
            click: function () { return files_1.showSaveDialog(ipc_events_1.IpcEvents.FS_SAVE_FIDDLE); },
            accelerator: !acceleratorsToBlock.includes("saveAs" /* saveAs */)
                ? 'CmdOrCtrl+Shift+S'
                : undefined,
        },
        {
            type: 'separator',
        },
        {
            label: 'Publish to Gist',
            click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.FS_SAVE_FIDDLE_GIST); },
        },
        {
            label: 'Save as Forge Project',
            click: function () {
                return files_1.showSaveDialog(ipc_events_1.IpcEvents.FS_SAVE_FIDDLE_FORGE, 'Forge Project');
            },
        },
    ];
    // macOS has these items in the "Fiddle" menu
    if (process.platform !== 'darwin') {
        fileMenu.splice.apply(fileMenu, __spreadArray(__spreadArray([fileMenu.length,
            0], getPreferencesItems()), getQuitItems()));
    }
    return {
        label: 'File',
        submenu: fileMenu,
    };
}
/**
 * Creates the app's window menu.
 */
function setupMenu(options) {
    var acceleratorsToBlock = (options === null || options === void 0 ? void 0 : options.acceleratorsToBlock) || [];
    var activeTemplate = (options === null || options === void 0 ? void 0 : options.activeTemplate) || null;
    // Get template for default menu
    var defaultMenu = require('electron-default-menu');
    var menu = defaultMenu(electron_1.app, electron_1.shell).map(function (item) {
        var _a;
        var label = item.label;
        // Append the "Settings" item
        if (process.platform === 'darwin' &&
            label === electron_1.app.name &&
            isSubmenu(item.submenu)) {
            (_a = item.submenu).splice.apply(_a, __spreadArray([2, 0], getPreferencesItems()));
        }
        // Custom handler for "Select All" for Monaco
        if (label === 'Edit' && isSubmenu(item.submenu)) {
            var selectAll = item.submenu.find(function (i) { return i.label === 'Select All'; });
            delete selectAll.role; // override default role
            selectAll.click = function () {
                ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.SELECT_ALL_IN_EDITOR);
                // Allow selection to occur in text fields outside the editors.
                if (process.platform === 'darwin') {
                    electron_1.Menu.sendActionToFirstResponder('selectAll:');
                }
            };
        }
        // Tweak "View" menu
        if (label === 'View' && isSubmenu(item.submenu)) {
            // remove "Reload" (has weird behaviour) and "Toggle Developer Tools"
            item.submenu = item.submenu.filter(function (subItem) {
                return subItem.label !== 'Toggle Developer Tools' &&
                    subItem.label !== 'Reload';
            });
            item.submenu.push({ type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }); // Add zooming actions
            item.submenu.push({ type: 'separator' }, {
                label: 'Toggle Soft Wrap',
                click: function () {
                    return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_TOGGLE_OPTION, ['wordWrap']);
                },
            });
            item.submenu.push({ type: 'separator' }, {
                label: 'Toggle Mini Map',
                click: function () {
                    return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.MONACO_TOGGLE_OPTION, [
                        'minimap.enabled',
                    ]);
                },
            });
            item.submenu.push({ type: 'separator' }, {
                label: 'Toggle Bisect Helper',
                click: function () { return ipc_1.ipcMainManager.send(ipc_events_1.IpcEvents.BISECT_COMMANDS_TOGGLE); },
                accelerator: 'CommandorControl+Shift+B',
            });
        }
        // Append items to "Help"
        if (label === 'Help' && isSubmenu(item.submenu)) {
            item.submenu = getHelpItems();
        }
        return item;
    });
    menu.splice(process.platform === 'darwin' ? 1 : 0, 0, getFileMenu(acceleratorsToBlock));
    menu.splice(menu.length - 1, 0, getTasksMenu(), getShowMeMenu(activeTemplate));
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(menu));
}
exports.setupMenu = setupMenu;
//# sourceMappingURL=menu.js.map
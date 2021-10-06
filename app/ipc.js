"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcMainManager = void 0;
var electron_1 = require("electron");
var events_1 = require("events");
var ipc_events_1 = require("./shared/ipc-events");
var windows_1 = require("./windows");
/**
 * The main purpose of this class is to be the central
 * gathering place for IPC calls the main process sends
 * or listens to.
 *
 * @class IpcManager
 * @extends {EventEmitter}
 */
var IpcMainManager = /** @class */ (function (_super) {
    __extends(IpcMainManager, _super);
    function IpcMainManager() {
        var _this = _super.call(this) || this;
        _this.readyWebContents = new WeakSet();
        _this.messageQueue = new WeakMap();
        ipc_events_1.ipcMainEvents.forEach(function (name) {
            electron_1.ipcMain.removeAllListeners(name);
            electron_1.ipcMain.on(name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.emit.apply(_this, __spreadArray([name], args));
            });
        });
        electron_1.ipcMain.on(ipc_events_1.WEBCONTENTS_READY_FOR_IPC_SIGNAL, function (event) {
            _this.readyWebContents.add(event.sender);
            var queue = _this.messageQueue.get(event.sender);
            _this.messageQueue.delete(event.sender);
            if (!queue)
                return;
            for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
                var item = queue_1[_i];
                _this.send(item[0], item[1], event.sender);
            }
        });
        return _this;
    }
    /**
     * Send an IPC message to an instance of Electron.WebContents.
     * If none is specified, we'll automatically go with the main window.
     *
     * @param {IpcEvents} channel
     * @param {Array<any>} args
     * @param {Electron.WebContents} [target]
     */
    IpcMainManager.prototype.send = function (channel, args, target) {
        var _target = target || windows_1.getOrCreateMainWindow().webContents;
        var _args = args || [];
        if (!this.readyWebContents.has(_target)) {
            var existing = this.messageQueue.get(_target) || [];
            this.messageQueue.set(_target, __spreadArray(__spreadArray([], existing), [[channel, args]]));
            return;
        }
        _target.send.apply(_target, __spreadArray([channel], _args));
    };
    IpcMainManager.prototype.handle = function (channel, listener) {
        // there can be only one, so remove previous one first
        electron_1.ipcMain.removeHandler(channel);
        electron_1.ipcMain.handle(channel, listener);
    };
    IpcMainManager.prototype.handleOnce = function (channel, listener) {
        electron_1.ipcMain.handleOnce(channel, listener);
    };
    return IpcMainManager;
}(events_1.EventEmitter));
exports.ipcMainManager = new IpcMainManager();
//# sourceMappingURL=ipc.js.map
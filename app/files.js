"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSaveDialog = exports.showOpenFilesDialog = exports.setupFileListeners = void 0;
var electron_1 = require("electron");
var fs = require("fs-extra");
var path = require("path");
var ipc_events_1 = require("./shared/ipc-events");
var ipc_1 = require("./ipc");
var interfaces_1 = require("./interfaces");
/**
 * Ensures that we're listening to file events
 */
function setupFileListeners() {
    var _this = this;
    ipc_1.ipcMainManager.handle(ipc_events_1.IpcEvents.FS_PICK_FILES_DIALOG, function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showOpenFilesDialog()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    }); });
}
exports.setupFileListeners = setupFileListeners;
/**
 * Shows the "Open Fiddle" dialog and forwards
 * the path to the renderer
 */
function showOpenFilesDialog() {
    return __awaiter(this, void 0, void 0, function () {
        var filePaths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog({
                        title: 'Picks Files To Add',
                        properties: ['openFile', "multiSelections"],
                        defaultPath: "C:\\"
                    })];
                case 1:
                    filePaths = (_a.sent()).filePaths;
                    if (!filePaths || filePaths.length < 1) {
                        return [2 /*return*/];
                    }
                    electron_1.app.addRecentDocument(filePaths[0]);
                    // ipcMainManager.send(IpcEvents.FS_OPEN_FIDDLE, [filePaths[0]]);
                    return [2 /*return*/, filePaths];
            }
        });
    });
}
exports.showOpenFilesDialog = showOpenFilesDialog;
/**
 * Shows the "Save Fiddle" dialog and forwards
 * the path to the renderer
 */
function showSaveDialog(event, as) {
    return __awaiter(this, void 0, void 0, function () {
        var filePaths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePaths = electron_1.dialog.showOpenDialogSync({
                        buttonLabel: 'Save here',
                        properties: ['openDirectory', 'createDirectory'],
                        title: "Save Fiddle" + (as ? " as " + as : ''),
                    });
                    if (!Array.isArray(filePaths) || filePaths.length === 0) {
                        return [2 /*return*/];
                    }
                    console.log("Asked to save to " + filePaths[0]);
                    return [4 /*yield*/, ensureSaveTargetEmpty(filePaths[0])];
                case 1:
                    // Let's confirm real quick if we want this
                    if (_a.sent()) {
                        ipc_1.ipcMainManager.send(event || ipc_events_1.IpcEvents.FS_SAVE_FIDDLE, [filePaths[0]]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.showSaveDialog = showSaveDialog;
/**
 * Ensures that a folder designated for saving is empty
 *
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
function ensureSaveTargetEmpty(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var targetPaths, noFilesOrOverwriteGranted, _i, targetPaths_1, targetPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetPaths = Object.values(interfaces_1.DefaultEditorId).map(function (filename) {
                        return path.join(filePath, filename);
                    });
                    noFilesOrOverwriteGranted = true;
                    _i = 0, targetPaths_1 = targetPaths;
                    _a.label = 1;
                case 1:
                    if (!(_i < targetPaths_1.length)) return [3 /*break*/, 4];
                    targetPath = targetPaths_1[_i];
                    if (!(fs.existsSync(targetPath) && noFilesOrOverwriteGranted)) return [3 /*break*/, 3];
                    return [4 /*yield*/, confirmFileOverwrite(targetPath)];
                case 2:
                    noFilesOrOverwriteGranted = _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, noFilesOrOverwriteGranted];
            }
        });
    });
}
/**
 * Pops open a confirmation dialog, asking the user if they really
 * want to overwrite an existing file
 *
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
function confirmFileOverwrite(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, electron_1.dialog.showMessageBox({
                            type: 'warning',
                            buttons: ['Cancel', 'Yes'],
                            message: 'Overwrite files?',
                            detail: "The file " + filePath + " already exists. Do you want to overwrite it?",
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, !!result];
                case 2:
                    error_1 = _a.sent();
                    // Let's not overwrite files. We'd rather crash.
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=files.js.map
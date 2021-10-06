"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE_NAME = exports.MAIN_JS = exports.DEFAULT_EDITORS = exports.DefaultEditorId = exports.RunResult = exports.GistActionState = exports.GistActionType = exports.VersionSource = exports.VersionState = void 0;
var VersionState;
(function (VersionState) {
    VersionState["ready"] = "ready";
    VersionState["downloading"] = "downloading";
    VersionState["unzipping"] = "unzipping";
    VersionState["unknown"] = "unknown";
})(VersionState = exports.VersionState || (exports.VersionState = {}));
var VersionSource;
(function (VersionSource) {
    VersionSource["remote"] = "remote";
    VersionSource["local"] = "local";
})(VersionSource = exports.VersionSource || (exports.VersionSource = {}));
var GistActionType;
(function (GistActionType) {
    GistActionType["publish"] = "Publish";
    GistActionType["update"] = "Update";
    GistActionType["delete"] = "Delete";
})(GistActionType = exports.GistActionType || (exports.GistActionType = {}));
var GistActionState;
(function (GistActionState) {
    GistActionState["publishing"] = "publishing";
    GistActionState["updating"] = "updating";
    GistActionState["deleting"] = "deleting";
    GistActionState["none"] = "none";
})(GistActionState = exports.GistActionState || (exports.GistActionState = {}));
var RunResult;
(function (RunResult) {
    RunResult["SUCCESS"] = "success";
    RunResult["FAILURE"] = "failure";
    RunResult["INVALID"] = "invalid";
})(RunResult = exports.RunResult || (exports.RunResult = {}));
// Default Editors
var DefaultEditorId;
(function (DefaultEditorId) {
    DefaultEditorId["main"] = "main.js";
    DefaultEditorId["renderer"] = "renderer.js";
    DefaultEditorId["html"] = "index.html";
    DefaultEditorId["preload"] = "preload.js";
    DefaultEditorId["css"] = "styles.css";
})(DefaultEditorId = exports.DefaultEditorId || (exports.DefaultEditorId = {}));
exports.DEFAULT_EDITORS = [
    DefaultEditorId.main,
    DefaultEditorId.renderer,
    DefaultEditorId.preload,
    DefaultEditorId.html,
    DefaultEditorId.css,
];
// main.js gets special treatment: it is required as the entry point
// when we run fiddles or create a package.json to package fiddles.
exports.MAIN_JS = DefaultEditorId.main;
exports.PACKAGE_NAME = 'package.json';
//# sourceMappingURL=interfaces.js.map
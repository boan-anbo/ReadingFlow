import {app, BrowserWindow, screen, Size} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import {setupDialogs} from "./dialogs";
import {setupExampleListeners} from "./test";
import {setupFileListeners} from "./files";
import {setupCore} from "./core";
import {spawn} from "child_process";
import {setupBackEndListeners} from "./backend";


// Initialize remote module
require('@electron/remote/main').initialize();

const log = require('electron-log');

const {ipcMain} = require('electron')
ipcMain.on('test', (event, arg) => {
  console.log("I Said Test", arg) // prints "ping"

  log.info(`%c${arg}`, 'color: green');
  event.reply('asynchronous-reply', 'pong')
})


let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;
  const size: Size = {height: 1440, width: 2560};

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
      enableRemoteModule: true // true if you want to run e2e test with Spectron or use remote module in renderer context (ie. Angular)
    },
  });


  if (serve) {
    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../node_modules/electron'))
    });
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

export async function onReady() {

  setTimeout(createWindow, 400);
  // hook up listeners.
  // setupMenu();
  setupBackEndListeners()
  setupDialogs()
  setupFileListeners();
  setupExampleListeners();
  setupCore()
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947

  app.whenReady().then(onReady)
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

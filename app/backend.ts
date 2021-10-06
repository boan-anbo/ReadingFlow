import {IpcEvents} from './shared/ipc-events';
import {ipcMainManager} from './ipc';
import {spawn} from "child_process";
import {app, ipcRenderer} from "electron";

const kill = require('tree-kill');
const getPort = require('get-port')


let currentRfServer;


let currentRfServerPort;

/**
 * Ensures that we're listening to file events
 */
export function setupBackEndListeners() {
  ipcMainManager.handle(IpcEvents.CORE_START_SERVER, async () => {
    await startServer("C:\\Script\\aspnetcore-grpc-rest\\rf-core\\bin\\Release\\net5.0\\rf-core.exe")
    return currentRfServerPort;
  });

  ipcMainManager.handle(IpcEvents.CORE_STOP_SERVER, async () => {
    await killServer();
  });

  ipcMainManager.handle(IpcEvents.GET_APP_PATHS, async () => {
    return currentRfServerPort;
  });

}




// functions
const spawnRfServer = async (executable, port) => {
  const rfServer = spawn(executable, ['--urls',
    `http://127.0.0.1:${port}`
  ]);


  rfServer.stdout.on('data', (data) => {
    console.log(`Rf-core info: ${data}`);
  });

  rfServer.stderr.on('data', (data) => {
    console.error(`Rf-core error: ${data}`);
  });

  rfServer.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  if (!rfServer) {
    console.error("Cannot start Rf-Server, quitting Electron.");
    app.quit();
  } else {
    console.log("Rf Server starting. PID:" + rfServer.pid)
  }

  return rfServer;

}


const killServer = async () => {
  if (currentRfServer?.pid) {
    await kill(currentRfServer.pid)
  }
}

const startServer = async (executable) => {
  const randomPort = await getPort();
  console.log("Found available port @ " + randomPort)
  currentRfServerPort = randomPort
  currentRfServer = await spawnRfServer(executable, randomPort);
}

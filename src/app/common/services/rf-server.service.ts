import {Injectable} from '@angular/core';
import {TauriService} from "../../core/services";
import {LoggingService} from "../../core/services/logging/logging.service";
import {HubService} from "./hub.service";
import {EVERYONE_INSTRUCTIONS, UPDATE_WORKING_STATE_INSTRUCTIONS} from "../../consts/hub-instruction";
import {HubQuickMessageService} from "./hub-quick-message.service";
import {SERVER_STATUS} from "../../consts/server-status";
import {COMPONENTS} from "../../consts/components";
import {Child, Command} from "@tauri-apps/api/shell";
import {ETauriCommands, runTauriCommand} from "../backend/tauriCommands";
import {DataClient, RootClient} from "../backend/rf-client";

@Injectable({
  providedIn: 'root'
})
export class RfServerService {
  apiPort: number;
  currentServerProcess: Child | null = null;

  constructor(
    private es: TauriService,
    private log: LoggingService,
    private hub: HubService,
    private hubQ: HubQuickMessageService,
    private rootClient: RootClient
  ) {
  }

  async startServer() {

    await this.stopServer()

    const availablePort = await runTauriCommand<number>(ETauriCommands.getFreePort);
    const command = new
    Command('cmd',
      ["/c",
        "C:/script/rf-core/RfCore/bin/Release/net5.0/win-x64/rfcore.exe",
        '--urls',
        `http://localhost:${availablePort}`
      ])
    command.on('close', data => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    })
    command.on('error', error => console.error(`command error: "${error}"`))
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`))
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`))

    const child = await command.spawn()
    console.log('pid: ', child.pid)
    this.currentServerProcess = child;
    this.apiPort = availablePort
    this.log.info(`Rf Server started at`, `127\.0\.0\.1:${this.apiPort}`);
    this.announceServerStarted();
  }

  public announceServerStarted() {
    // Update working state with the latest status to be fetched passively..
    this.hubQ.tellWorkingStateToUpdate(UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_SERVER_STATUS, SERVER_STATUS.STARTED);

    // Send a notification to the hub, so some components can react to it actively such as projects that can load data automatically.
    this.hub.sendHubMessage({
      instruction: EVERYONE_INSTRUCTIONS.RFSERVER_HAS_STARTED,
      payload: null,
      receiver: COMPONENTS._EVERYONE,
      sender: COMPONENTS.BACKEND_SERVICE
    });
  }

  public announceServerStopped() {
    this.hubQ.tellWorkingStateToUpdate(UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_SERVER_STATUS, SERVER_STATUS.STOPPED);
    this.hub.sendHubMessage({
      instruction: EVERYONE_INSTRUCTIONS.RFSERVER_HAS_STOPPED,
      payload: null,
      receiver: COMPONENTS._EVERYONE,
      sender: COMPONENTS.BACKEND_SERVICE
    });
  }

  async stopServer() {
    await this.AskServerToExit();
    await this.killChildProcess();

  }

  async AskServerToExit() {
    if (this.apiPort) {
      await this.rootClient.shutDown().toPromise();
    }

  }

  async killChildProcess() {

    if (this.currentServerProcess) {

      console.log("Killing", this.currentServerProcess.pid)
      const killResult = await this.currentServerProcess.kill();
      console.log("Killing result", killResult);
      this.currentServerProcess = null;
      this.log.info(`Rf Server stopped.`);
      this.apiPort = null;

      this.announceServerStopped();
    } else {
      console.warn("Cannot stop server because it's not existence")
    }
  }

  async restartServer() {
    await this.stopServer();
    await this.startServer();
  }

}

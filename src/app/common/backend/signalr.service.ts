import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import {LoggingService} from "../../core/services/logging/logging.service";


/**
 * The SignalR Service works like this: the backend implments a class with multiple methods that can be mapped by ASP.net as signalR endpoints.
 * This service make connection with one of the endpoints.
 * The connection can be attached with listeners to listen on certain "channels" such as "ReceiveMessage" on the Asp end. And data that channel receives on the backend will be pushed to this service.
 * To send message from the front end to the backend, I can "invoke" the methods defined in the signal mapped class. This message can again be listened upon by myself on the frontend.
 */
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  constructor(private log: LoggingService) { }

  public initiateSignalrConnection(): Promise<void>{

    this.log.info("Initiating Signal R")
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:19862/message-hub') // the SignalR server url
        .build();
       this.connection
        .start()
        .then(() => {
          this.log.info(`SignalR connection success! connectionId: ${this.connection.connectionId} `);

          this.loadListeners();
          resolve();
        })
        .catch((error) => {
          this.log.info(`SignalR connection error: ${error}`);
          reject();
        });
    });

  }

  public loadListeners() {

    this.connection.on("ReceiveMessage", (user, message) =>{
      this.log.info(`"Receive Signalr Message from ${user}:`, message)
    });
  }
}

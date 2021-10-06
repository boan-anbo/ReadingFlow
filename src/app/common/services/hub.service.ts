import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {LoggingService} from "../../core/services/logging/logging.service";
import {HUB_INSTRUCTION} from "../../consts/hub-instruction";
import {HubMessage} from "../../consts/hub-message";


@Injectable({
  providedIn: 'root'
})
export class HubService {
  hubMessagesMonitor: Subscription;

  readonly hubMessages = new BehaviorSubject<HubMessage<any, any>>(null);

  constructor(private log: LoggingService) {
    this.hubMessagesMonitor = this.hubMessages.subscribe(this.hubMessagesHandler);
  }

  hubMessagesHandler = (message: HubMessage<any>) => {
    this.log.info(`Hub receives a new message:`, message.instruction);

  }

  sendHubMessage<RECEIVER_INSTRUCTION=HUB_INSTRUCTION>(message: HubMessage<any, RECEIVER_INSTRUCTION>) {
    this.log.info('Hub sending message:', message.instruction);
    this.hubMessages.next(message);
  }

}

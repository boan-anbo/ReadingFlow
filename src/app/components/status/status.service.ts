import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {STATUS_INSTRUCTIONS} from '../../consts/hub-instruction';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.STATUS || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.statusHubMessageHandler);

  }

  statusHubMessageHandler = (message: HubMessage<any, STATUS_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case STATUS_INSTRUCTIONS.STATUS_INSTRUCTION:
      //   break;
      // default:
      //   break;
    }
  };
  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<STATUS_INSTRUCTIONS>({
  //     instruction: STATUS_INSTRUCTIONS.STATUS_INSTRUCTION,
  //     sender: COMPONENTS.STATUS,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }
}

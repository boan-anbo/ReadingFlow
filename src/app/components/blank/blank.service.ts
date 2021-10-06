import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {BLANK_INSTRUCTIONS} from '../../consts/hub-instruction';

@Injectable({
  providedIn: 'root'
})
export class BlankService {

  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.BLANK || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.blankHubMessageHandler);

  }

  blankHubMessageHandler = (message: HubMessage<any, BLANK_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case BLANK_INSTRUCTIONS.BLANK_INSTRUCTION:
        break;
      default:
        break;
    }
  };
  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<BLANK_INSTRUCTIONS>({
  //     instruction: BLANK_INSTRUCTIONS.BLANK_INSTRUCTION,
  //     sender: COMPONENTS.BLANK,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }
}

import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {SIDEPANEL_INSTRUCTIONS} from "../../consts/hub-instruction";

@Injectable({
  providedIn: 'root'
})
export class SidepanelService {

  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.SIDEPANEL || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.sidepanelHubMessageHandler);

  }

  sidepanelHubMessageHandler = (message: HubMessage<any, SIDEPANEL_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case SIDEPANEL_INSTRUCTIONS.SIDEPANEL_INSTRUCTION:
      //   break;
      // default:
      //   break;
    }
  };
  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<SIDEPANEL_INSTRUCTIONS>({
  //     instruction: SIDEPANEL_INSTRUCTIONS.SIDEPANEL_INSTRUCTION,
  //     sender: COMPONENTS.SIDEPANEL,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }
}

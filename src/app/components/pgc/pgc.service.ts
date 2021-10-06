import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {PGC_INSTRUCTIONS} from '../../consts/hub-instruction';

@Injectable({
  providedIn: 'root'
})
export class PgcService {

  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter( (message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.PGC || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.pgcHubMessageHandler);

  }

  pgcHubMessageHandler = (message: HubMessage<any, PGC_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case PGC_INSTRUCTIONS.PGC_INSTRUCTION:
      //   break;
      default:
        break;
    }
  };
  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<PGC_INSTRUCTIONS>({
  //     instruction: PGC_INSTRUCTIONS.PGC_INSTRUCTION,
  //     sender: COMPONENTS.PGC,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }
}

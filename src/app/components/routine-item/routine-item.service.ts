import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {ROUTINE_ITEM_INSTRUCTIONS} from '../../consts/hub-instruction';

@Injectable({
  providedIn: 'root'
})
export class RoutineItemService {

  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ROUTINE_ITEM || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.routineItemHubMessageHandler);

  }

  routineItemHubMessageHandler = (message: HubMessage<any, ROUTINE_ITEM_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case RoutineItem_INSTRUCTIONS.RoutineItem_INSTRUCTION:
      //   break;
      default:
        break;
    }
  };
  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<RoutineItem_INSTRUCTIONS>({
  //     instruction: RoutineItem_INSTRUCTIONS.RoutineItem_INSTRUCTION,
  //     sender: COMPONENTS.RoutineItem,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }
}

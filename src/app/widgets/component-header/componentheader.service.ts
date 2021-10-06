import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {COMPONENTHEADER_INSTRUCTIONS} from "../../consts/hub-instruction";

@Injectable({
  providedIn: 'root'
})
export class ComponentheaderService {

  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter( (message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.COMPONENTHEADER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.componentheaderHubMessageHandler);

  }

  componentheaderHubMessageHandler = (message: HubMessage<any, COMPONENTHEADER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case COMPONENTHEADER_INSTRUCTIONS.COMPONENTHEADER_INSTRUCTION:
        break;
      default:
        break;
    }
  };
}

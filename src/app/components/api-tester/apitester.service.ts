import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {filter} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HubMessage} from '../../consts/hub-message';
import {APITESTER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {COMPONENTS} from '../../consts/components';

@Injectable({
  providedIn: 'root'
})
export class ApitesterService {

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private http: HttpClient,
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.APITESTER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.apitesterHubMessageHandler);
  }

  apitesterHubMessageHandler = (message: HubMessage<any, APITESTER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case APITESTER_INSTRUCTIONS.APITESTER_INSTRUCTION:
      //   break;
      // default:
      //   break;
    }
  };

  async getUrl(url: string): Promise<any> {
    this.log.info('Getting Url', url);
    // return await this.http.get(url).toPromise();
  }

  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<APITESTER_INSTRUCTIONS>({
  //     instruction: APITESTER_INSTRUCTIONS.APITESTER_INSTRUCTION,
  //     sender: COMPONENTS.APITESTER,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }
}

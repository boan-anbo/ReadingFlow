import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {EVERYONE_INSTRUCTIONS, ROUTINE_BROWSER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {RoutineClient, RoutineEntity} from "../../common/backend/rf-client";
import {WorkingStateService} from "../../common/services/working-state.service";

@Injectable({
  providedIn: 'root'
})
export class RoutineBrowserService {

  hasRoutines = false;
  showRoutines: boolean = false;

  get routines(): RoutineEntity[] {
    return this._routines;
  }

  set routines(value: RoutineEntity[]) {
    this.showRoutines = value?.length > 0;
    this._routines = value;
  }
  private _routines: RoutineEntity[] = [];


  constructor(
    private log: LoggingService,
    private hub: HubService,
    private rfRoutine: RoutineClient,
    private state: WorkingStateService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ROUTINE_BROWSER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.routineBrowserHubMessageHandler);

  }

  routineBrowserHubMessageHandler = async (message: HubMessage<any, ROUTINE_BROWSER_INSTRUCTIONS | EVERYONE_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case EVERYONE_INSTRUCTIONS.RFSERVER_HAS_STARTED:
        await this.loadRoutines();
        break;
      default:
        break;
    }
  };

  async loadRoutines() {
    if (!this.state.serverHasStarted()) {return;}
    this.log.info('Loading ROutines', this.routines);
    this.routines = [];
    this.routines = await this.rfRoutine.listRoutines().toPromise();
    this.log.info('Routines Loaded', this.routines);
  }
}

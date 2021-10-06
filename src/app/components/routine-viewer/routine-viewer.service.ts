import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {ROUTINE_VIEWER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {NoProjectSelectedError} from '../../exceptions/no-project-selected-error';
import {Selections} from '../../common/utils/selections';
import {DataClient, ListEntity, RoutineClient, RoutineEntity, RoutineItemEntity} from '../../common/backend/rf-client';
import {WorkingStateService} from "../../common/services/working-state.service";
import {RoutingQuickService} from "../../common/services/routing-quick.service";
import {NoRoutineSelectedError} from "../../exceptions/no-routine-selected-error";

@Injectable({
  providedIn: 'root'
})
export class RoutineViewerService {
  sourceListIds: Selections<ListEntity> = new Selections<ListEntity>();
  hasRoutineItems = false;
  get routine(): RoutineEntity {
    return this._routine;
  }

  set routine(value: RoutineEntity) {
    this._routine = value;
    this.currentRoutineId = value.id;
    this.hasRoutineItems = value.routineItems?.length > 0;
  }
   currentRoutineId: string;
   routineItemSelections = new Selections<RoutineItemEntity>();
   private _routine: RoutineEntity;

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private rfRoutine: RoutineClient,
    private state: WorkingStateService,
    private routeQ: RoutingQuickService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ROUTINE_VIEWER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.routineViewerHubMessageHandler);

  }

  routineViewerHubMessageHandler = async (message: HubMessage<any, ROUTINE_VIEWER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case ROUTINE_VIEWER_INSTRUCTIONS.RELOAD_DATA:
        await this.loadRoutine(message.payload);
        break;
      default:
        break;
    }
  };
  async loadRoutine(routineId?: string, reload = false) {
    // if not reload mode, the item selections will be cleared for each loading.
    if (!reload) {
      this.routineItemSelections.clear();
    }
    const targetRoutineId = routineId ?? this.currentRoutineId;
    this.log.info('Program-Viewer is loading rfRoutine for', targetRoutineId);
    this.routine = await this.rfRoutine.getRoutine(targetRoutineId).toPromise();
    this.log.info('Program-Viewer loaded rfRoutine for', targetRoutineId);
  }

  async generateProgramAndJumpToIt() {
    this.log.info("Generating Program From Routine")
    if (!this.currentRoutineId) {
      throw new Error("You have not selected id");
    }
    const program = await this.rfRoutine.generateProgramFromRoutine(this.currentRoutineId).toPromise();
    await this.routeQ.toProgramViewerSecondReload(program.id);
  }

  async deleteRoutine() {
    if (!this.currentRoutineId) {
        throw new NoRoutineSelectedError();
    }
    this.log.info(`Delete Routing ${this.routine.name}`)

    await this.rfRoutine.deleteRoutine(this.currentRoutineId).toPromise();
    await this.routeQ.toRoutineBrowserSecondReload();
  }
}

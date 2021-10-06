import {Injectable} from '@angular/core';
import {NoListSelectedError} from '../../exceptions/no-list-selected-error';
import {BehaviorSubject} from 'rxjs';
import {WORKING_STATE} from '../../consts/working-state';
import {NoProjectSelectedError} from '../../exceptions/no-project-selected-error';
import {ListEntity, ProgramEntity, ProgramItemEntity, ProjectEntity} from '../backend/rf-client';
import {HubService} from './hub.service';
import {filter} from 'rxjs/operators';
import {LoggingService} from '../../core/services/logging/logging.service';
import {UPDATE_WORKING_STATE_INSTRUCTIONS} from '../../consts/hub-instruction';
import {HubMessage} from '../../consts/hub-message';
import {COMPONENTS} from '../../consts/components';
import {SERVER_STATUS} from '../../consts/server-status';

@Injectable({
  providedIn: 'root'
})
export class WorkingStateService {

  // all these are for consumption not modification because the original values belong to where they are stored individually.
  get currentProgram(): ProgramEntity {
    return this._currentProgram;
  }
  get currentReadingItem(): ProgramItemEntity {
    return this._currentReadingItem;
  }
  get currentList(): ListEntity {
    return this._currentList;
  }
  get currentProject(): ProjectEntity {
    return this._currentProject;
  }

  get serverStatus(): SERVER_STATUS {
    return this._serverStatus;
  }

  private _currentProject: ProjectEntity;
  private _currentList: ListEntity;
  private _currentReadingItem: ProgramItemEntity;
  private _currentProgram: ProgramEntity;
  private _serverStatus: SERVER_STATUS = SERVER_STATUS.STARTED;


  workingState: BehaviorSubject<WORKING_STATE> = new BehaviorSubject<WORKING_STATE>(WORKING_STATE.IDLE);

  /**
   * Central control for checking states, such as if project is selected, if list is selected, so on. Also provide a global app state broadcast so other components can know if something is loading in the background for example.
   */
  constructor(
    private hub: HubService,
    private log: LoggingService
  ) {

    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.WORKING_STATE_SERVICE || message.receiver === COMPONENTS._EVERYONE))
      .subscribe(this.workingStateHubMessageHandler);
  }

  workingStateHubMessageHandler = (message: HubMessage<any, UPDATE_WORKING_STATE_INSTRUCTIONS>) => {
    const {payload} = message;
    this.log.silly(`Working state is updating${message.instruction}`);
    if (!payload && message.receiver === COMPONENTS.WORKING_STATE_SERVICE) {
      throw new Error('Cannot proccess update working state instruction because the payload is empty.');
    }
    switch (message.instruction) {
      case UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_LIST:
        this._currentList = payload as ListEntity;
        break;
      case UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_PROGRAM:
        this._currentProgram = payload as ProgramEntity;
        break;
      case UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_PROJECT:
        this._currentProject = payload as ProjectEntity;
        break;
      case UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_READING:
        // this.log.warn("UPDATING CURRENT READING", payload)
        this._currentReadingItem = payload as ProgramItemEntity;
        break;
      case UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_SERVER_STATUS:
        this._serverStatus = payload as SERVER_STATUS;

    }
    return;
  };

  isListAvailable(): boolean {
    return this._currentList !== null && this._currentList !== undefined;
  }

  checkIfListAvailableOrThrow() {
    if (!this.isListAvailable()) {
      throw new NoListSelectedError();
    }
  }

  serverHasStarted() {
    return this.serverStatus === SERVER_STATUS.STARTED;
  }


  serverHasStopped() {
    return this.serverStatus === SERVER_STATUS.STARTED;
  }
  getCurrentProjectId(): string {
    if (!this._currentProject) {
      throw new NoProjectSelectedError();
    }
    return this._currentProject?.id;
  }

  isProjectSelected() {
    return this._currentProject?.id.length > 0;
  }

}

import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {PROGRAM_BROWSER_SERVICE_INSTRUCTION} from '../../consts/hub-instruction';
import {DataClient, ProgramEntity, RoutineClient} from '../../common/backend/rf-client';
import {ProjectService} from '../../common/services/project.service';
import {NoProjectSelectedError} from '../../exceptions/no-project-selected-error';
import {ProgramType} from '../../consts/program-type';

@Injectable({
  providedIn: 'root'
})
export class ProgramBrowserService {

  programs: ProgramEntity[] = [];
  programType: ProgramType = ProgramType.PROJECT;

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private data: DataClient,
    private rfRoutine: RoutineClient,
    private project: ProjectService,
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) =>
          message.receiver === COMPONENTS.PROGRAM_BROWSER
          ||
          message.receiver === COMPONENTS._EVERYONE
        )
      )
      .subscribe(this.programBrowserHubMessageHandler);
  }

  programBrowserHubMessageHandler = async (message: HubMessage<any, PROGRAM_BROWSER_SERVICE_INSTRUCTION>) => {
    switch (message.instruction) {
      case PROGRAM_BROWSER_SERVICE_INSTRUCTION.SHOW_PROJECT_PROGRAMS:
        this.log.info('Program Browser: Switch Mode to project programs.');
        await this.loadProjectPrograms(ProgramType.PROJECT);
        return;
      case PROGRAM_BROWSER_SERVICE_INSTRUCTION.SHOW_ROUTINE_PROGRAMS:
        this.log.info('Program Browser: Switch Mode to routine programs.');
        await this.loadProjectPrograms(ProgramType.ROUTINE);
        return;
      default:
        break;
    }
  };

  async loadProjectPrograms(type: ProgramType) {
    if (!type) {
      type = this.programType;
    } else {
      this.programType = type;
    }

    if (type === ProgramType.PROJECT && !this.project.currentProject) {
      throw new NoProjectSelectedError();
    }
    this.programs = [];
    this.log.info('Loading Program by project', this.project.currentProject);


    switch (type) {
      case ProgramType.PROJECT:
        this.programs = await this.data.getProgramsByProject(this.project.currentProject.id).toPromise();
        break;
      case ProgramType.ROUTINE:
        this.programs = await this.rfRoutine.listRoutinePrograms().toPromise();
        break;
      default:
        throw new Error('Cannot load program browser because no program type is specified');

    }


    this.log.info('Program Loaded', this.programs);
  }

}

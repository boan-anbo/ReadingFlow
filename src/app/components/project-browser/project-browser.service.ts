import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {DataClient, ProjectEntity} from "../../common/backend/rf-client";
import {EVERYONE_INSTRUCTIONS, PROJECT_BROWSER_SERVICE_INSTRUCTION} from "../../consts/hub-instruction";
import {WorkingStateService} from "../../common/services/working-state.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectBrowserService {

  projects: ProjectEntity[] = [];

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private data: DataClient,
    private state: WorkingStateService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.PROJECT_BROWSER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.projectBrowserHubMessageHandler);

  }

  projectBrowserHubMessageHandler = async (message: HubMessage<any, PROJECT_BROWSER_SERVICE_INSTRUCTION | EVERYONE_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case EVERYONE_INSTRUCTIONS.RFSERVER_HAS_STARTED:
        await this.loadProjects();
        break;
      //   break;
      // default:
      //   break;
    }
  };

  async loadProjects() {

    if (!this.state.serverHasStarted()) return;
    this.projects = await this.data.getProjects().toPromise();
  }

}

import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {LIST_BROWSER_SERVICE_INSTRUCTION} from '../../consts/hub-instruction';
import {DataClient, ListEntity} from '../../common/backend/rf-client';
import {ProjectService} from "../../common/services/project.service";
import {NoProjectSelectedError} from "../../exceptions/no-project-selected-error";

@Injectable({
  providedIn: 'root'
})
export class ListBrowserService {

  lists: ListEntity[] = [];

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private data: DataClient,
    private project: ProjectService,
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) =>
          message.receiver === COMPONENTS.LIST_BROWSER
          ||
          message.receiver === COMPONENTS._EVERYONE
        )
      )
      .subscribe(this.listBrowserHubMessageHandler);

  }

  listBrowserHubMessageHandler = async (message: HubMessage<any, LIST_BROWSER_SERVICE_INSTRUCTION>) => {
    switch (message.instruction) {
      case LIST_BROWSER_SERVICE_INSTRUCTION.RELOAD_MAIN_DATA:
        await this.loadProjectLists();
        return;
      default:
        break;
    }
  };

  async loadProjectLists() {
    if (!this.project.currentProject) {
      throw new NoProjectSelectedError();
    }
    this.lists = [];
    this.log.info("Loading List by project", this.project.currentProject);
    this.lists = await this.data.getListsByProject(this.project.currentProject.id).toPromise();
    this.log.info("List Loaded", this.lists)
  }

}

import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {LIST_VIEWER_INSTRUCTIONS, ZOTERO_BROWSER_INSTRUCTIONS} from '../../consts/hub-instruction';
import {ZoteroClient, ZoteroReturnDataOfZoteroCollection} from "../../common/backend/rf-client";
import {WorkingStateService} from "../../common/services/working-state.service";
import {NoProjectSelectedError} from "../../exceptions/no-project-selected-error";

@Injectable({
  providedIn: 'root'
})
export class ZoteroBrowserService {
  zoteroCollections: ZoteroReturnDataOfZoteroCollection[];

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private zotero: ZoteroClient,
    private state: WorkingStateService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ZOTERO_BROWSER || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.zoteroBrowserHubMessageHandler);

  }

  zoteroBrowserHubMessageHandler = (message: HubMessage<any, ZOTERO_BROWSER_INSTRUCTIONS>) => {
    switch (message.instruction) {
      // case ZOTERO_BROWSER_INSTRUCTIONS.ZoteroBrowser_INSTRUCTION:
      //   break;
      default:
        break;
    }
  };

  async tellListViewerToAddZoteroImportSource(sourceKey: string) {
    await this.hub.sendHubMessage<LIST_VIEWER_INSTRUCTIONS>({
      instruction: LIST_VIEWER_INSTRUCTIONS.ADD_ZOTERO_COLLECTION_KEY,
      payload: sourceKey,
      sender: COMPONENTS.ZOTERO_BROWSER,
      receiver: COMPONENTS.LIST_VIEWER
    })
  };

  async loadAllZoteroCollections() {
    this.zoteroCollections = await this.zotero.getAllZoteroCollections().toPromise();
  }

  async addZoteroCollectionAsProjectList(collection: ZoteroReturnDataOfZoteroCollection) {
    const projectId = this.state.getCurrentProjectId();
    if (!projectId) {
      throw new NoProjectSelectedError();
    }

    this.log.info(`Adding Zotero Collection ${collection.data.name} to ${projectId}`)
    await this.zotero.addZoteroCollectionAsProjectList(collection.key, projectId).toPromise();
  }
}

import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {ITEM_TAGGING_SERVICE_INSTRUCTIONS} from '../../consts/hub-instruction';
import {DataClient, TagEntity} from '../../common/backend/rf-client';
import {Selections} from '../../common/utils/selections';

@Injectable({
  providedIn: 'root'
})
export class ItemTaggingService {
  selectedTags = new Selections<TagEntity>();
  allTags: TagEntity[] = [];

  constructor(
    private log: LoggingService,
    private hub: HubService,
    private data: DataClient
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ITEM_TAGGING_SERVICE || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.itemTaggingHubMessageHandler);

  }

  itemTaggingHubMessageHandler = (message: HubMessage<any, ITEM_TAGGING_SERVICE_INSTRUCTIONS>) => {
    switch (message.instruction) {
      case ITEM_TAGGING_SERVICE_INSTRUCTIONS.UPDATE_SELECTED_TAG_IDS:
        const tagIds = message.payload as string[];
        this.updateSelectedTagIds(tagIds);
        break;
      // default:
      //   break;
    }
  };
  // sendSomeHubMessage(item: Item) {
  //   // the generic refers to the available instructions on the receiving end. Here I'm sending message received and handled by myself.
  //   this.hub.sendHubMessage<ItemTagging_INSTRUCTIONS>({
  //     instruction: ItemTagging_INSTRUCTIONS.ItemTagging_INSTRUCTION,
  //     sender: COMPONENTS.ItemTagging,
  //     receiver: COMPONENTS.PROGRAM_LIST_SERVICE,
  //     payload: item
  //   });
  // }

  updateSelectedTagIds(newSelectedIds: string[]) {

    this.log.info('Updating selected tags');
    this.log.silly('Tagging Service detected input change, the current item tag ids:', newSelectedIds);
    this.selectedTags.setManyIds(newSelectedIds);
  }

  async loadTags() {
    this.log.info('Loading Tags');
    this.allTags = await this.data.getTags().toPromise();
    this.log.info('Loaded tags', this.allTags);
  }

}

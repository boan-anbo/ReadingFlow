import {Injectable} from '@angular/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {HubService} from '../../common/services/hub.service';
import {HubMessage} from '../../consts/hub-message';
import {filter} from 'rxjs/operators';
import {COMPONENTS} from '../../consts/components';
import {
  EVERYONE_INSTRUCTIONS,
  ITEM_CONTROL_INSTRUCTIONS,
  ITEM_TAGGING_SERVICE_INSTRUCTIONS
} from '../../consts/hub-instruction';
import {ItemEntity} from '../../common/backend/rf-client';

@Injectable({
  providedIn: 'root'
})
export class ItemControlService {
  selectedItems: ItemEntity [] = [];
  selectedItemTags: string[];
  selectedItemFilePaths: string[];


  constructor(
    private log: LoggingService,
    private hub: HubService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ITEM_CONTROL || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.itemControlHubMessageHandler);

  }

  itemControlHubMessageHandler = (message: HubMessage<any, ITEM_CONTROL_INSTRUCTIONS | EVERYONE_INSTRUCTIONS>) => {
    this.log.info('Item Control received message', message);
    const payloadItem: ItemEntity = message.payload as ItemEntity;
    switch (message.instruction) {
      case ITEM_CONTROL_INSTRUCTIONS.SELECT_ITEM:
        this.selectedItems = [payloadItem];
        break;
      case ITEM_CONTROL_INSTRUCTIONS.UNSELECT_ITEM:
        this.selectedItems = this.selectedItems.filter(item => item.id !== payloadItem.id);
        break;
      case ITEM_CONTROL_INSTRUCTIONS.ADD_ITEM:
        // ensure only one unique item is added even though multiple list items or program items might be seleveral..
        if (!this.hasItem(payloadItem)) {
          this.selectedItems.push(payloadItem);
        }
        break;
      case ITEM_CONTROL_INSTRUCTIONS.REMOVE_ITEM:
        this.log.info("Pre-Removal", this.selectedItems)
        this.selectedItems = this.selectedItems.filter(item => item.id !== payloadItem.id);
        this.log.info("Post-Removal", this.selectedItems)
        break;

      // default:
      // throw new InstructionUnimpementedError(message);
    }

    // update item tags
    this.updateSelectedItemTags(this.selectedItems);
    // update selected item files
    this.updateSelectedItemFilePaths(this.selectedItems);
    // tell item tagging service to update preselected tag ids.
    this.tellItemTaggingServiceToUpdateSelectedIds(this.selectedItemTags);
  };

  hasItem(itemToAdd: ItemEntity) {
    return this.selectedItems.some(currentItem => currentItem.id === itemToAdd.id);
  }

  tellItemTaggingServiceToUpdateSelectedIds(selectedItemTags: string[]) {
    this.hub.sendHubMessage<ITEM_TAGGING_SERVICE_INSTRUCTIONS>({
      sender: COMPONENTS.ITEM_CONTROL,
      receiver: COMPONENTS.ITEM_TAGGING_SERVICE,
      instruction: ITEM_TAGGING_SERVICE_INSTRUCTIONS.UPDATE_SELECTED_TAG_IDS,
      payload: selectedItemTags
    });
  }

  getSelecteItemIds(): string[] {
    return this.selectedItems.map(item => item.id);
  }

  updateSelectedItemTags(selectedItems: ItemEntity[]) {
    this.log.info('Before Refreshed Selected Items\'s Tags', this.selectedItems);
    this.selectedItemTags = selectedItems.flatMap(item => item.tags?.map(tag => tag.id)) ?? [];
    this.log.info('Refreshed Selected Items\'s Tags', this.selectedItemTags);
  }

  updateSelectedItemFilePaths(seletedItems: ItemEntity[]) {
    this.selectedItemFilePaths = seletedItems.flatMap(item => item.itemFiles?.map(itemFile => itemFile.filePath)) ?? [];
  }
}

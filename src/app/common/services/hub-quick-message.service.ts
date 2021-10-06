import {Injectable} from '@angular/core';
import {HubService} from "./hub.service";
import {ProgramItem} from "../../models/program-item";
import {ITEM_OPERATIONS} from "../../consts/item-operations";
import {ItemEntity} from "../backend/rf-client";
import {
  DATA_VIEWER_INSTRUCTIONS,
  EVERYONE_INSTRUCTIONS,
  ITEM_CONTROL_INSTRUCTIONS,
  LIST_BROWSER_SERVICE_INSTRUCTION,
  PROGRAM_BROWSER_SERVICE_INSTRUCTION,
  PROGRAM_VIEWER_INSTRUCTIONS,
  READING_CONTROL_INSTRUCTIION,
  UPDATE_WORKING_STATE_INSTRUCTIONS
} from "../../consts/hub-instruction";
import {COMPONENTS} from "../../consts/components";

/**
 * Store often used hub messages so the callers don't need to implement message senders themselves.
 */
@Injectable({
  providedIn: 'root'
})
export class HubQuickMessageService {

  constructor(private hub: HubService) {

  }


  tellWorkingStateToUpdate(updateInstruction: UPDATE_WORKING_STATE_INSTRUCTIONS, entityToUpdate, sender = COMPONENTS.ANONYMOUS_SENDER) {
    this.hub.sendHubMessage<UPDATE_WORKING_STATE_INSTRUCTIONS>({
      sender,
      receiver: COMPONENTS.WORKING_STATE_SERVICE,
      instruction: updateInstruction,
      payload: entityToUpdate
    });
  }

  tellReadingControlToReadnext() {
    this.hub.sendHubMessage<READING_CONTROL_INSTRUCTIION>({
      sender: COMPONENTS.ANONYMOUS_SENDER,
      receiver: COMPONENTS.READING_CONTROL,
      instruction: READING_CONTROL_INSTRUCTIION.READ_NEXT,
      payload: null
    })
  }

  tellProgramToMarkProgramItemRead(sender: COMPONENTS, programItem: ProgramItem) {
    this.hub.sendHubMessage<PROGRAM_VIEWER_INSTRUCTIONS>({
      sender,
      receiver: COMPONENTS.PROGRAM_VIEWER,
      instruction: PROGRAM_VIEWER_INSTRUCTIONS.SET_PROGRAM_LIST_ITEM_READ,
      payload: programItem,
    })
  }

  tellDataViwersToReload(receiver: COMPONENTS, idToLoad: string = null, sender: COMPONENTS = COMPONENTS.ANONYMOUS_SENDER) {

    this.hub.sendHubMessage<DATA_VIEWER_INSTRUCTIONS>({
      sender,
      receiver,
      instruction: DATA_VIEWER_INSTRUCTIONS.RELOAD_MAIN_DATA,
      payload: idToLoad
    });
  }


  tellItemControlToDoItem(sender: COMPONENTS, item: ItemEntity, operation: ITEM_OPERATIONS) {
    let instruction: ITEM_CONTROL_INSTRUCTIONS;
    switch (operation) {
      case ITEM_OPERATIONS.SELECT:
        instruction = ITEM_CONTROL_INSTRUCTIONS.SELECT_ITEM;
        break;
      case ITEM_OPERATIONS.UNSELECT:
        instruction = ITEM_CONTROL_INSTRUCTIONS.UNSELECT_ITEM;
        break;
      case ITEM_OPERATIONS.ADD:
        instruction = ITEM_CONTROL_INSTRUCTIONS.ADD_ITEM;
        break;
      case ITEM_OPERATIONS.REMOVE:
        instruction = ITEM_CONTROL_INSTRUCTIONS.REMOVE_ITEM;
        break;
      case ITEM_OPERATIONS.ADDMULTIPLE:
        break;
      case ITEM_OPERATIONS.REMOVEMULTIPLE:
        break;

    }

    this.hub.sendHubMessage<ITEM_CONTROL_INSTRUCTIONS>({
      receiver: COMPONENTS.ITEM_CONTROL,
      sender,
      instruction,
      payload: item
    });
  }

  AnnounceSingleSelection(sender: COMPONENTS, entry: ItemEntity): void {
    this.hub.sendHubMessage<EVERYONE_INSTRUCTIONS>({
      sender,
      payload: entry,
      instruction: EVERYONE_INSTRUCTIONS.ANNOUNCE_SINGLE_SELECTION,
      receiver: COMPONENTS._EVERYONE
    })
  }

  /**
   * Payload are item ides: string[]
   * @param itemIds
   * @param sender
   */
  tellProgramItemViewerToReloadModifiedItems(itemIds: string[], sender = COMPONENTS.ANONYMOUS_SENDER) {
    // this.hub.sendHubMessage<ITEM_VIEWER_INSTRUCTIONS>({
    //   sender,
    //   payload: itemIds,
    //   instruction: ITEM_VIEWER_INSTRUCTIONS.RELOAD_DATA,
    //   receiver: COMPONENTS.ITEM_VIEWER_COMPONENT
    // })

    this.hub.sendHubMessage<PROGRAM_VIEWER_INSTRUCTIONS>({
      sender,
      payload: itemIds,
      instruction: PROGRAM_VIEWER_INSTRUCTIONS.RELOAD_ITEMS,
      receiver: COMPONENTS.PROGRAM_VIEWER
    })
  }

  async tellProgramBrowserToShowProjectPrograms() {

    this.hub.sendHubMessage<PROGRAM_BROWSER_SERVICE_INSTRUCTION>({
      sender: COMPONENTS.ANONYMOUS_SENDER,
      instruction: PROGRAM_BROWSER_SERVICE_INSTRUCTION.SHOW_PROJECT_PROGRAMS,
      receiver: COMPONENTS.PROGRAM_BROWSER
    })
  }

  async tellProgramBrowserToShowRoutinePrograms() {

    this.hub.sendHubMessage<PROGRAM_BROWSER_SERVICE_INSTRUCTION>({
      sender: COMPONENTS.ANONYMOUS_SENDER,
      instruction: PROGRAM_BROWSER_SERVICE_INSTRUCTION.SHOW_ROUTINE_PROGRAMS,
      receiver: COMPONENTS.PROGRAM_BROWSER
    })
  }

  async tellListBrowserToReload() {
    this.hub.sendHubMessage<LIST_BROWSER_SERVICE_INSTRUCTION>({
      sender: COMPONENTS.ANONYMOUS_SENDER,
      receiver: COMPONENTS.LIST_BROWSER,
      instruction: LIST_BROWSER_SERVICE_INSTRUCTION.RELOAD_MAIN_DATA,
      payload: null
    });
  }
}

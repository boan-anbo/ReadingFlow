import {Injectable} from '@angular/core';
import {LoggingService} from "../../core/services/logging/logging.service";
import {ProgramEmptyError} from "../../exceptions/program-empty-error";
import {ProgramViewerService} from "../program-viewer/program-viewer.service";
import {ReadingService} from "../reading/reading.service";
import {HubService} from "../../common/services/hub.service";
import {ReadingControlOptions} from "../../models/control-options";
import {DataClient, EProgramItemType, ProgramItemEntity} from "../../common/backend/rf-client";
import {filter} from "rxjs/operators";
import {
  ITEM_VIEWER_INSTRUCTIONS,
  PROGRAM_VIEWER_INSTRUCTIONS,
  READING_CONTROL_INSTRUCTIION
} from "../../consts/hub-instruction";
import {HubMessage} from "../../consts/hub-message";
import {COMPONENTS} from "../../consts/components";

@Injectable({
  providedIn: 'root'
})
export class ReadingControlService {

  currentReadingControlOptions = new ReadingControlOptions({

    autoOpenInViewer: true,
    allowGoingBack: false,
  })
  autoOpenFileInViewer = true;

  constructor(
    private log: LoggingService,
    private programService: ProgramViewerService,
    private readingService: ReadingService,
    private hub: HubService,
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.READING_CONTROL || message.receiver === COMPONENTS._EVERYONE)
      )
      .subscribe(this.readingControlHubMessageHandler);

  }

  readingControlHubMessageHandler = (message: HubMessage<any, READING_CONTROL_INSTRUCTIION>) => {
    switch (message.instruction) {
      case READING_CONTROL_INSTRUCTIION.READ_NEXT:
        this.log.info("Reading control receives read next instruction")
        this.readNext();
        break;
      // case PROJECT_BROWSER_SERVICE_INSTRUCTION:
      //   break;
      // default:
      //   break;
    }
  };

  /**
   * If not override, use reading control default control options
   * @param opt
   */
  async readNext(opt?: ReadingControlOptions) {
    if (!opt) {
      opt = this.currentReadingControlOptions;
    }

    if (this.programService.isProgramEmpty()) {
      this.log.warn(`Your program is empty`);
      throw new ProgramEmptyError();
    }

    const nextItem = this.programService.getNextItem(opt);
    if (nextItem) {
      this.setCurrentReadingItemAsRead()
      this.log.info(`Got Next Item, starting reading;`, nextItem.id);
      await this.readingService.readNext(nextItem, opt);
      // this.askListComponentToDetectChange();
    } else {
      if (this.readingService.isReading()) {
        this.log.info(`Cannot find next item from program. Reading finished.`);
        this.readingService.finishedReading();
      } else {
        this.log.warn(`Cannot find next item from program. Reading interrupted.`);
      }
    }
  }

  askListComponentToDetectChange() {

    this.hub.sendHubMessage<ITEM_VIEWER_INSTRUCTIONS>({
      sender: COMPONENTS.READING_CONTROL,
      receiver: COMPONENTS.ITEM_VIEWER_COMPONENT,
      payload: undefined,
      instruction: ITEM_VIEWER_INSTRUCTIONS.DETECT_CHANGE
    })
  }

  tellProgramServiceAProgramItemIsRead(currentProgramItem: ProgramItemEntity) {
    this.hub.sendHubMessage<PROGRAM_VIEWER_INSTRUCTIONS>({
      sender: COMPONENTS.READING_CONTROL,
      receiver: COMPONENTS.PROGRAM_VIEWER,
      instruction: PROGRAM_VIEWER_INSTRUCTIONS.SET_PROGRAM_LIST_ITEM_READ,
      payload: currentProgramItem
    })
  }

  setCurrentReadingItemAsRead() {

    const currentReadingItem = this.readingService.getCurrentReadingEntry();
    if (!currentReadingItem) return;
    if (currentReadingItem.type === EProgramItemType.ITEM) {
      this.tellProgramServiceAProgramItemIsRead(currentReadingItem as ProgramItemEntity)
    }
    this.log.info("Current Reading Item Finished", currentReadingItem);
  }
}

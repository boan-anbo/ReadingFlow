import {PROGRAM_ENTRY_TYPE} from './program-entry-type';
import {AbstractModel} from "./abstract-model";
import {ProgramEntry} from "./program-entry.interface";

export class ProgramBreak extends AbstractModel implements ProgramEntry {
  duration = 300;
  ended: Date;
  order = 0;
  started: Date;
  selected = false;
  type = PROGRAM_ENTRY_TYPE.PROGRAM_BREAK;

  constructor(duration?: number) {
    super();
    if (duration) {
      this.duration = duration;
    }
  }


}

import {AbstractModel} from "./abstract-model";
import {Project} from "./project";
import {ListItem} from "./list-item";
import {HasOrder} from "./has-order.interface";
import {ProgramItem} from "./program-item";
import {ProgramEntry} from "./program-entry.interface";
import {ProgramBreak} from "./program-break";

export class Program extends AbstractModel implements HasOrder {
  name: string;
  projectId: string;
  programItems: ProgramItem[] = [];
  programBreaks: ProgramBreak[] = [];
  // a collection of ids of program items and program breaks. breaks are stored in the form of durations.
  order = 0;

  constructor(name: string) {
    super();
    this.name = name;
  }

}

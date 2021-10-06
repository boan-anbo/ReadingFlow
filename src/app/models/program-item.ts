import {Strategy} from './strategy';
import {Item} from './item';
import {AbstractModel} from './abstract-model';
import {ProgramEntry} from './program-entry.interface';
import {PROGRAM_ENTRY_TYPE} from './program-entry-type';

export class ProgramItem extends AbstractModel implements ProgramEntry {
  created: Date = new Date();
  duration = 0;
  ended: Date = null;
  read = false;
  selected = false;
  item: Item;
  order = 0;
  strategy: Strategy;
  started: Date = null;
  programId: string;
  type = PROGRAM_ENTRY_TYPE.PROGRAM_ITEM;

  constructor(item: Item, strategy?: Strategy) {
    super();
    this.item = item;
    this.strategy = strategy ?? new Strategy();
  }

  static fromJson(jsonProgramItem: Partial<ProgramItem>) {
    const newProgramItem = new ProgramItem({} as Item);
    Object.assign(newProgramItem, jsonProgramItem);
    return newProgramItem;
  }

}

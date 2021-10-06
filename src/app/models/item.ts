import {AbstractModel} from './abstract-model';
import {ItemFile} from './item-file';
import {Importance} from './importance';
import {ProgramItem} from './program-item';

export class Item extends AbstractModel {
  name: string;
  listId: string = null;
  //Todo move this property to importance.
  importance: Importance = Importance.None;
  itemFiles: ItemFile[] = [];

  constructor(name: string) {
    super();
    this.name = name;
  }



}

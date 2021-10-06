import {Item} from "./item";
import {AbstractModel} from "./abstract-model";

export class ListItem extends AbstractModel {
  constructor(newItem: Item) {
    super();
    this.item = newItem;
  }

  item: Item;
  order = 0;
  selected = false;
}

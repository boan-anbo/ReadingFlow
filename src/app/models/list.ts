import {AbstractModel} from "./abstract-model";
import {Project} from "./project";
import {ListItem} from "./list-item";
import {HasOrder} from "./has-order.interface";

export class List extends AbstractModel implements HasOrder {
  name: string;
  listItems: ListItem [] = []
  projectId: string;
  order = 0;

  constructor(name: string) {
    super();
    this.name = name;
  }

}

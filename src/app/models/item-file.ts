import {AbstractModel} from "./abstract-model";

export class ItemFile extends AbstractModel {
  filePath: string = null;
  itemId: string = null;
  size: number = null;

  constructor(filePath: string) {
    super();
    this.filePath = filePath;
  }
}

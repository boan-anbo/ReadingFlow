import {AbstractModel} from "./abstract-model";

export class Tag extends AbstractModel{
  constructor(name: string) {
    super();
    this.name = name;
  }
  name: string;
  notes: string;
}

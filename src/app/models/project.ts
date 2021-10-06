import {AbstractModel} from "./abstract-model";
import {List} from "./list";
import { Program } from "./program";

export class Project extends AbstractModel {
  name: string;
  lists: List[] = [];
  programs: Program[] = [];

  constructor(name: string) {
    super();
    this.name = name;
  }

}

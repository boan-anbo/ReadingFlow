import {AbstractModel} from './abstract-model';
import {Importance} from "./importance";

export class Note extends AbstractModel {

  linkedId: string;
  content: string;
  importance: Importance = Importance.None;

  constructor(linkedId: string) {
    super();
    this.linkedId = linkedId;
  }
}

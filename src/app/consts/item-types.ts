import {Project} from '../models/project';
import {Item} from '../models/item';
import {List} from "../models/list";

export enum ITEM_TYPES {
  PROJECT = 'PROJECT',
  ITEM = 'ITEM',
  LIST = 'LIST',
  ITEM_FILE = 'ITEM_FILE'
}

export type ItemTypes = Item | List;


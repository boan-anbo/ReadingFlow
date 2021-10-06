import {v4} from 'uuid';

export abstract class AbstractModel {
  id: string = v4();
}

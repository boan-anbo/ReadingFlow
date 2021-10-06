import {HasOrder} from "./has-order.interface";

export interface ProgramEntry extends HasOrder {
  id: string;
  duration: number;
  selected: boolean;
}

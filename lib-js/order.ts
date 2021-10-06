import {ProgramEntry} from "../src/app/models/program-entry.interface";
import {HasOrder} from "../src/app/models/has-order.interface";

export const updateOrder = (items: HasOrder[]): any[] => {
  items.forEach((item, index) => item.order = index + 1);
  return items;
}

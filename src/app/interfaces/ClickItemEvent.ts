import {ItemEntity} from "../common/backend/rf-client";

export interface ClickItemEvent {
  item: ItemEntity
  event: MouseEvent
}

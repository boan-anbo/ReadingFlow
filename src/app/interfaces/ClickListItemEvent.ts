import {ItemEntity, ListItemEntity} from "../common/backend/rf-client";

export interface ClickListItemEvent {
  listItem: ListItemEntity
  event: MouseEvent
}

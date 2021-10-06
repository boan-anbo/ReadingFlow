import {ITEM_TYPES} from "../consts/item-types";

export class ItemExistedInCollectionError extends Error{

  constructor(existedMemberItemType: ITEM_TYPES, existedCollectionItemType: ITEM_TYPES) {
    super(`${existedMemberItemType} already existed in ${existedCollectionItemType}`);
  }
}

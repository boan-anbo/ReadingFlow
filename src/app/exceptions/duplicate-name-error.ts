import {ITEM_TYPES} from "../consts/item-types";

export class DuplicateNameError extends Error{

  constructor(nameDuplicated, itemType: ITEM_TYPES) {
    super(`Name "${nameDuplicated}" for ${itemType} Duplicated`);
  }
}

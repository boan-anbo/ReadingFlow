import {DuplicateNameError} from './duplicate-name-error';
import {ITEM_TYPES} from "../consts/item-types";

describe('DuplicateNameError', () => {
  it('should create an instance', () => {
    expect(new DuplicateNameError('test', ITEM_TYPES.PROJECT)).toBeTruthy();
  });
});

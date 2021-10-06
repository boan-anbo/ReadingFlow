
export class ItemHasNoFileError extends Error{

  constructor(itemName: string) {
    super(`Item ${itemName} has no files.`);
  }
}

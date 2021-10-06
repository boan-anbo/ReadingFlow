
export class NoFilePathError extends Error{

  constructor(itemName: string) {
    super(`No path found for ${itemName}`);
  }
}

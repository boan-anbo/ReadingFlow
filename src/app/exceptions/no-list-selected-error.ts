
export class NoListSelectedError extends Error{

  constructor() {
    super(`You have to select a list first`);
  }
}

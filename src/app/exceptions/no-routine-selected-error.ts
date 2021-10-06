
export class NoRoutineSelectedError extends Error{

  constructor() {
    super(`You have to select a routine first`);
  }
}

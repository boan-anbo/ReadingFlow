
export class ProgramEmptyError extends Error{

  constructor(additionalMessage?: string) {
    super(`Cannot proceed because your program is empty.` + '\n' + additionalMessage);
  }
}

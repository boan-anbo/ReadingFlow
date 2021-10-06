
export class NotImplementedError extends Error{

  constructor(functionName?: string) {
    super(`${functionName ?? ''} Not Implemented`);
  }
}

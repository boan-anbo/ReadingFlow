import {ERROR_MESSAGES} from "./error-messages/error-messages";

export class NoProjectSelectedError extends Error {

  constructor() {
    super(ERROR_MESSAGES.NO_PROJECT_SELECTED);
    this.name = NoProjectSelectedError.name
    Object.setPrototypeOf(this, NoProjectSelectedError.prototype);
  }
}

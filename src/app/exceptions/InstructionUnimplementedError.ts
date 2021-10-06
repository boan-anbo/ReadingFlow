import {HubMessage} from "../consts/hub-message";

export class InstructionUnimpementedError extends Error{

  constructor(message: HubMessage<any, any>) {
    super(`${message.instruction} from ${message.sender} to ${message.receiver} unimplemented.`);
  }
}

import {COMPONENTS} from './components';
import {HUB_INSTRUCTION} from "./hub-instruction";

export class HubMessage<PAYLOAD=any, RECEIVER_INSTRUCTION=HUB_INSTRUCTION> {
  instruction: RECEIVER_INSTRUCTION;
  sender: COMPONENTS;
  receiver: COMPONENTS;
  payload?: PAYLOAD;
}

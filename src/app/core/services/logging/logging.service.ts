import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  loggingOff = false;
  constructor() {

  }

  prettyJson(input: any) {
    return JSON.stringify(input, null, 2)
  }

  info(text: string | string[], payload?: any) {
    if (this.loggingOff) return;

    // log.info('%cRed text. %cGreen text', 'color: red', 'color: green')
    console.info(`%c${this.prettyJson(text)}${payload ? ('\n\n%c' + this.prettyJson(payload) ) : ''}`, 'color: green', payload ? 'color: blue' : '');
  }

  warn(text: string | string[], payload?: any) {

    if (this.loggingOff) return;
    // log.info('%cRed text. %cGreen text', 'color: red', 'color: green')
    console.warn(`%c${this.prettyJson(text)}${payload ? ('\n\n%c' + this.prettyJson(payload)) : ''}`, 'color: blue', payload ? 'color: blue' : '');
  }

  silly(text: string | string[], payload?: any) {

    if (this.loggingOff) return;

    // log.info('%cRed text. %cGreen text', 'color: red', 'color: green')
    console.debug(`%c${this.prettyJson(text)}${payload ? ('\n\n%c' + this.prettyJson(payload)) : ''}`, 'color: gray', payload ? 'color: gray' : '');
  }
}

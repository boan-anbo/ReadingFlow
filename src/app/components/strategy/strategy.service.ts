import { Injectable } from '@angular/core';
import {LoggingService} from "../../core/services/logging/logging.service";

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  constructor(
    private log: LoggingService
  ) { }
}

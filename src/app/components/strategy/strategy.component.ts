import {Component, Input, OnInit} from '@angular/core';
import {StrategyService} from './strategy.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {

  @Input() strategy;
  constructor(
    private strategyService: StrategyService,
    private translate: TranslateService,
    private log: LoggingService
  ) { }

  ngOnInit(): void {
    this.log.info('StrategyComponent INIT');
   }

}

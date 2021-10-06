import {Component, Input, OnInit} from '@angular/core';
import {BlankService} from './blank.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  @Input() blank;
  constructor(
    private blankService: BlankService,
    private translate: TranslateService,
    private log: LoggingService
  ) { }

  ngOnInit(): void {
    this.log.info('BlankComponent INIT');
   }

}

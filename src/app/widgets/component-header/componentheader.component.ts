import {Component, Input, OnInit} from '@angular/core';
import {ComponentheaderService} from './componentheader.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {WorkingStateService} from "../../common/services/working-state.service";

@Component({
  selector: 'app-componentheader',
  templateUrl: './componentheader.component.html',
  styleUrls: ['./componentheader.component.scss']
})
export class ComponentheaderComponent implements OnInit {
  @Input() postHeaderName: string;
  @Input() showCurrentProjectName = true;
  @Input() headerName;

  constructor(
    private componentheaderService: ComponentheaderService,
    private translate: TranslateService,
    private log: LoggingService,
    public state: WorkingStateService
  ) {
  }

  ngOnInit(): void {
    this.log.info('ComponentheaderComponent INIT');
    if (this.postHeaderName && !this.headerName) {
      throw new Error("You provided post header name but did not provide header name before it.")
    }
  }

}

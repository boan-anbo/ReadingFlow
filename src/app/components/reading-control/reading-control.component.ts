import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {ProgramViewerService} from '../program-viewer/program-viewer.service';
import {ReadingService} from '../reading/reading.service';
import {ProgramEmptyError} from "../../exceptions/program-empty-error";
import {ItemService} from "../item/item.service";
import {ReadingControlOptions} from "../../models/control-options";
import {ReadingControlService} from "./reading-control.service";

/**
 * Responsible for control.
 */
@Component({
  selector: 'app-reading-control',
  templateUrl: './reading-control.component.html',
  styleUrls: ['./reading-control.component.scss']
})
export class ReadingControlComponent implements OnInit {

  constructor(
    public controlService: ReadingControlService,
    private translate: TranslateService,
    private log: LoggingService,
    private programService: ProgramViewerService,
    private readingService: ReadingService,
  ) {
  }

  ngOnInit(): void {
    this.log.info('ControlComponent INIT');
  }

  readNext() {
    this.controlService.readNext();
  }
}

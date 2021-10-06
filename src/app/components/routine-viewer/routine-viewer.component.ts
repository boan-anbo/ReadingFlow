import {Component, Input, OnInit} from '@angular/core';
import {RoutineViewerService} from './routine-viewer.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {WorkingStateService} from "../../common/services/working-state.service";

@Component({
  selector: 'app-routineViewer',
  templateUrl: './routine-viewer.component.html',
  styleUrls: ['./routine-viewer.component.scss']
})
export class RoutineViewerComponent implements OnInit {

  @Input() routineViewer;

  constructor(
    public routineViewerService: RoutineViewerService,
    private translate: TranslateService,
    private log: LoggingService,
    private state: WorkingStateService
  ) {
  }

  ngOnInit(): void {
    this.log.info('RoutineViewerComponent INIT');
  }

  addCurrentList() {
    const currentList =
      this.state.currentList;
    this.routineViewerService.sourceListIds.setId(currentList.id);
  }

  async generateProgram() {
    await this.routineViewerService.generateProgramAndJumpToIt();
  }

  async onRoutineItemAdded() {

    await this.routineViewerService.loadRoutine()
  }

  async deleteRoutine() {
    await this.routineViewerService.deleteRoutine()
  }
}

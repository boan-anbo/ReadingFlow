import {Component, OnInit} from '@angular/core';
import {ProgramBrowserService} from './program-browser.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {ProgramEntity} from '../../common/backend/rf-client';
import {ProgramViewerService} from '../program-viewer/program-viewer.service';
import {RoutingService} from '../../common/services/routing.service';
import {RoutingQuickService} from '../../common/services/routing-quick.service';
import {WorkingStateService} from '../../common/services/working-state.service';
import {DataQuickService} from '../../common/services/data-quick.service';
import {type} from "os";
import {ProgramType} from "../../consts/program-type";

@Component({
  selector: 'app-program-browser',
  templateUrl: './program-browser.component.html',
  styleUrls: ['./program-browser.component.scss']
})
export class ProgramBrowserComponent implements OnInit {
  newProjectName: string;

  constructor(
    private programBrowserService: ProgramBrowserService,
    private translate: TranslateService,
    private log: LoggingService,
    private programViewer: ProgramViewerService,
    private route: RoutingService,
    private routeQ: RoutingQuickService,
    public state: WorkingStateService,
    public dataQ: DataQuickService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.log.info('ProgramBrowserComponent INIT');
    this.clearPrograms();
  }


  getPrograms(): ProgramEntity[] {
    return this.programBrowserService.programs;
  }

  clearPrograms() {
    this.programBrowserService.programs = [];
  }

  async toProgram(program: ProgramEntity) {
    await this.routeQ.toProgramViewerSecondReload(program.id);
  }

  hasProject() {
    return this.state.isProjectSelected();
  }

  hasPrograms() {
    return this.programBrowserService.programs?.length > 0;
  }

  async onNewProgramCreated(newProgramName: string) {

    const result = await this.dataQ.createProgramInCurrentProject(newProgramName);
    this.log.info('Result of create project in current project',result);
    await this.programBrowserService.loadProjectPrograms(ProgramType.PROJECT);
  }

}

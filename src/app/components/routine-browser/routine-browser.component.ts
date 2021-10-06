import {Component, Input, OnInit} from '@angular/core';
import {RoutineBrowserService} from './routine-browser.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {DataClient, GenericCreateDtoWithName, RoutineClient, RoutineEntity} from '../../common/backend/rf-client';
import {RoutingQuickService} from '../../common/services/routing-quick.service';

@Component({
  selector: 'app-routine-browser',
  templateUrl: './routine-browser.component.html',
  styleUrls: ['./routine-browser.component.scss']
})
export class RoutineBrowserComponent implements OnInit {

  @Input() routineBrowser;
  constructor(
    public routineBrowserService: RoutineBrowserService,
    private translate: TranslateService,
    private log: LoggingService,
    private rfRoutine: RoutineClient,
    private routeQ: RoutingQuickService
  ) { }

  async ngOnInit(): Promise<void> {
    this.log.info('RoutineBrowserComponent INIT');
    await this.routineBrowserService.loadRoutines();
  }

  async onNewRoutineCreated(name: string) {
    this.log.info('Creating Routine');
    await this.rfRoutine.createRoutine(new GenericCreateDtoWithName({
      name
    })).toPromise();
    await this.routineBrowserService.loadRoutines();
  }

  async toRoutine(routine: RoutineEntity) {
    await this.routeQ.toRoutineViwerSecondReload(routine.id);
  }
}

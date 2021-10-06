import {Injectable} from '@angular/core';
import {ROUTES} from '../../ROUTES';
import {RoutingService} from './routing.service';
import {COMPONENTS} from "../../consts/components";
import {HubQuickMessageService} from "./hub-quick-message.service";

@Injectable({
  providedIn: 'root'
})
export class RoutingQuickService {

  constructor(
    private route: RoutingService,
    private hubQ: HubQuickMessageService
  ) {
  }


  async toListBrowserFirstReload() {
    await this.route.toFirstRoute(ROUTES.LIST_BROWSER, COMPONENTS.LIST_BROWSER);
  }

  async toListViewerFirstReload() {
    await this.route.toFirstRoute(ROUTES.LIST_VIEWER, COMPONENTS.LIST_VIEWER);
  }

  async toListViewerFirstWithId(id: string) {
    await this.route.toFirstRoute(ROUTES.LIST_VIEWER, COMPONENTS.LIST_VIEWER, id);
  }


  async toProgramBrowserSecondReload() {

    await this.hubQ.tellProgramBrowserToShowProjectPrograms();
    await this.route.toSecondRoute(ROUTES.PROGRAM_BROWSER, COMPONENTS.PROGRAM_BROWSER);
  }

  async toRoutineProgramBrowserSecond() {

    await this.hubQ.tellProgramBrowserToShowRoutinePrograms();
    await this.route.toSecondRoute(ROUTES.PROGRAM_BROWSER);
  }

  async toProgramViewerSecondReload(id: string) {

    await this.route.toSecondRoute(ROUTES.PROGRAM_VIEWER, COMPONENTS.PROGRAM_VIEWER, id);
  }

  async toProgramViewerSecond() {

    await this.route.toSecondRoute(ROUTES.PROGRAM_VIEWER);
  }

  async toRoutineBrowserSecondReload() {
    await this.route.toSecondRoute(ROUTES.ROUTINE_BROWSER, COMPONENTS.ROUTINE_BROWSER);
  }

  // open routine viewer AND tell it to load data.
  async toRoutineViwerSecondReload(routineId: string) {
    await this.route.toSecondRoute(ROUTES.ROUTINE_VIEWER, COMPONENTS.ROUTINE_VIEWER, routineId);
  }

  async toZoteroBrowserSecond() {
    await this.route.toSecondRoute(ROUTES.ZOTERO_BROWSER);
  }
}

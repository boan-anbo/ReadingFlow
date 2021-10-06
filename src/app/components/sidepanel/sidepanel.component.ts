import {Component, Input, OnInit} from '@angular/core';
import {SidepanelService} from './sidepanel.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {RoutingService} from "../../common/services/routing.service";
import {ROUTES} from "../../ROUTES";
import {ROUTE_OUTLET} from "../../consts/route-outlets";
import {RoutingQuickService} from "../../common/services/routing-quick.service";

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

  @Input() sidepanel;
  constructor(
    private sidepanelService: SidepanelService,
    private translate: TranslateService,
    private log: LoggingService,
    private route: RoutingService,
    private routeQ: RoutingQuickService
  ) { }

  ngOnInit(): void {
    this.log.info('SidepanelComponent INIT');
   }

  toSecondApiTester() {
    this.route.toSecondRoute(ROUTES.APITESTER);
  }

  toFirstProjectBrowser() {
    this.route.toFirstRoute(ROUTES.PROJECT_BROWSER);
  }

  async toFirstListBrowser() {
    await this.routeQ.toListBrowserFirstReload();
  }

  async toSecondProgramBrowser() {
    await this.routeQ.toProgramBrowserSecondReload()
  }

  async toSecondRoutineBrowser() {
    await this.routeQ.toRoutineBrowserSecondReload();
  }

  async toSecondRoutineProgramBrowser() {
    await this.routeQ.toRoutineProgramBrowserSecond()
  }

  async toSecondZoteroBrowser() {
    await this.routeQ.toZoteroBrowserSecond();
  }
}

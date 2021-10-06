import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {TauriService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG} from '../environments/environment';
import {LoggingService} from './core/services/logging/logging.service';
import {InitService} from './common/services/init.service';
import {FileService} from './common/services/file.service';
import {PageScrollService} from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';
import {RoutingQuickService} from "./common/services/routing-quick.service";
import {RoutingService} from "./common/services/routing.service";
import {ROUTES} from "./ROUTES";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  itemId: string;
  constructor(
    private es: TauriService,
    private translate: TranslateService,
    private log: LoggingService,
    private initService: InitService,
    private file: FileService,
    private routeQ: RoutingQuickService,
    private route: RoutingService,
    private scroll: PageScrollService, @Inject(DOCUMENT) private document: any
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (es.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      // console.log('Electron ipcRenderer', this.es.ipcRenderer);
      // console.log('NodeJS childProcess', this.es.childProcess);
      // console.log('Electron Remote Module', this.es.remote);


    } else {
      console.log('Run in browser');
    }
  }

  async ngOnInit(): Promise<void> {
    await this.route.toFirstRoute(ROUTES.PROJECT_BROWSER)
    await this.route.toSecondRoute(ROUTES.ROUTINE_BROWSER)

    // console.log(this.electronService.prisma)
    // const result = await new this.electronService.prisma().user.findFirst()
    // console.log(result)
    // this.knex.test()
  }


  getTestArray() {
    return [0, 1, 2,3,4,5];
  }
  async ngAfterViewInit(): Promise<void> {
    await this.initService.init();


    // const results = await this.file.pickFiles();
    // this.log.info(`Picked Files: ${JSON.stringify(results)}`)
    // this.es.ipcRenderer.send('test', 'ping');
    // this.ipc.send(IpcEvents.SHOW_LOCAL_VERSION_FOLDER_DIALOG)

    // const result = await this.ipcRendererManager.invoke(IpcEvents.EXAMPLE_MAIN_ACTION);
    // this.log.info(result);
  }
}

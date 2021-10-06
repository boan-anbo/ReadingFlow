import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HomeModule} from './home/home.module';
import {DetailModule} from './detail/detail.module';

import {AppComponent} from './app.component';
import {BlankModule} from './components/blank/blank.module';
import {ListViewerModule} from './components/list/list-viewer.module';
import {ImporterModule} from './components/importer/importer.module';
import {ReadingModule} from './components/reading/reading.module';
import {StrategyModule} from './components/strategy/strategy.module';
import {ProgramViewerModule} from './components/program-viewer/program-viewer.module';
import {ListItemModule} from './components/list-item/list-item.module';
import {ProgramListItemModule} from './components/program-list-item/program-list-item.module';
import {ItemModule} from './components/item/item.module';
import {FlexModule} from '@angular/flex-layout';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';
import {ItemControlModule} from './components/item-control/item-control.module';
import {ItemControlComponent} from './components/item-control/item-control.component';
import {ReadingControlModule} from './components/reading-control/reading-control.module';
import {ApitesterModule} from './components/api-tester/apitester.module';
import {HttpPerformanceInterceptor} from './core/interceptors/http-performance-interceptor';
import {ProjectBrowserModule} from './components/project-browser/project-browser.module';
import {SidepanelModule} from './components/sidepanel/sidepanel.module';
import {ListBrowserModule} from './components/list-browser/list-browser.module';
import {ProgramBrowserModule} from './components/program-browser/program-browser.module';
import {PgcModule} from "./components/pgc/pgc.module";
import {HttpRerouteInterceptor} from "./core/interceptors/http-reroute-interceptor";
import {RfServerService} from "./common/services/rf-server.service";
import {RoutineBrowserModule} from "./components/routine-browser/routine-browser.module";
import {RoutineViewerModule} from "./components/routine-viewer/routine-viewer.module";
import {StatusModule} from "./components/status/status.module";
import {ZoteroBrowserModule} from "./components/zotero-browser/zotero-browser.module";

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, ItemControlComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    ImporterModule,
    ReadingModule,
    StrategyModule,
    ProgramViewerModule,
    ListItemModule,
    ItemControlModule,
    ProgramListItemModule,
    BlankModule,
    ProjectBrowserModule,
    ItemModule,
    FlexModule,
    ApitesterModule,
    ListViewerModule,
    AppRoutingModule,
    SidepanelModule,
    ListBrowserModule,
    ProgramBrowserModule,
    PgcModule,
    NgxPageScrollCoreModule,
    RoutineBrowserModule,
    RoutineViewerModule,
    StatusModule,
    ZoteroBrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReadingControlModule,
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS, useClass: HttpRerouteInterceptor, multi: true, deps: [
        RfServerService
      ]
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpPerformanceInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

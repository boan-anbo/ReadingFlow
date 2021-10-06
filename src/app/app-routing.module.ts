import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {BlankRoutingModule} from './components/blank/blank-routing.module';
import {ROUTES} from './ROUTES';
import {ReadingRoutingModule} from './components/reading/reading-routing.module';
import {StrategyRoutingModule} from './components/strategy/strategy-routing.module';
import {ProgramViewerRoutingModule} from './components/program-viewer/program-viewer-routing.module';
import {ApitesterRoutingModule} from './components/api-tester/apitester-routing.module';
import {ProjectBrowserRoutingModule} from './components/project-browser/project-browser-routing.module';
import {ListBrowserRoutingModule} from './components/list-browser/list-browser-routing.module';
import {ProgramBrowserRoutingModule} from './components/program-browser/program-browser-routing.module';
import {RoutineBrowserRoutingModule} from './components/routine-browser/routine-browser-routing.module';
import {RoutineViewerModule} from './components/routine-viewer/routine-viewer.module';
import {RoutineViewerRoutingModule} from './components/routine-viewer/routine-viewer-routing.module';
import {ROUTE_OUTLET} from './consts/route-outlets';
import {ZoteroBrowserRoutingModule} from './components/zotero-browser/zotero-browser-routing.module';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: ROUTES.PROJECT_BROWSER,
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'reload'
    }),
    HomeRoutingModule,
    DetailRoutingModule,
    BlankRoutingModule,
    ReadingRoutingModule,
    StrategyRoutingModule,
    ProgramViewerRoutingModule,
    ApitesterRoutingModule,
    ProjectBrowserRoutingModule,
    ListBrowserRoutingModule,
    ProgramBrowserRoutingModule,
    RoutineBrowserRoutingModule,
    RoutineViewerRoutingModule,
    ZoteroBrowserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

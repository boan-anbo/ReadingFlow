import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoutineBrowserComponent} from './routine-browser.component';
import {ROUTES} from '../../ROUTES';
import {ROUTE_OUTLET} from "../../consts/route-outlets";

const routes: Routes = [
  {
    path: ROUTES.ROUTINE_BROWSER,
    component: RoutineBrowserComponent
  },

  {
    path: ROUTES.ROUTINE_BROWSER,
    component: RoutineBrowserComponent,
    outlet: ROUTE_OUTLET.SECONDARY.toString()
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineBrowserRoutingModule {
}

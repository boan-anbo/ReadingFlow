import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoutineViewerComponent} from './routine-viewer.component';
import {ROUTES} from '../../ROUTES';
import {ROUTE_OUTLET} from "../../consts/route-outlets";

const routes: Routes = [
  {
    path: ROUTES.ROUTINE_VIEWER,
    component: RoutineViewerComponent
  },

  {
    path: ROUTES.ROUTINE_VIEWER,
    component: RoutineViewerComponent,
    outlet: ROUTE_OUTLET.SECONDARY.toString()
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineViewerRoutingModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProgramViewerComponent} from './program-viewer.component';
import {ROUTES} from '../../ROUTES';
import {ROUTE_OUTLET} from "../../consts/route-outlets";

const routes: Routes = [
  {
    path: ROUTES.PROGRAM_VIEWER,
    component: ProgramViewerComponent
  },
  {
    path: ROUTES.PROGRAM_VIEWER,
    component: ProgramViewerComponent,
    outlet: ROUTE_OUTLET.SECONDARY.toString()
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramViewerRoutingModule {
}

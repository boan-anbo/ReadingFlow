import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '../../ROUTES';
import {ProgramBrowserComponent} from './program-browser.component';
import {ROUTE_OUTLET} from "../../consts/route-outlets";

const routes: Routes = [
  {
    path: ROUTES.PROGRAM_BROWSER,
    component: ProgramBrowserComponent
  },

  {
    path: ROUTES.PROGRAM_BROWSER,
    component: ProgramBrowserComponent,
    outlet: ROUTE_OUTLET.SECONDARY.toString()
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramBrowserRoutingModule {
}

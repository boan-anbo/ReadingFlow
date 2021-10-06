import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '../../ROUTES';
import {ListBrowserComponent} from './list-browser.component';
import {ROUTE_OUTLET} from "../../consts/route-outlets";

const routes: Routes = [
  {
    path: ROUTES.LIST_BROWSER,
    component: ListBrowserComponent
  },

  {
    path: ROUTES.LIST_BROWSER,
    component: ListBrowserComponent,
    outlet: ROUTE_OUTLET.SECONDARY.toString()
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBrowserRoutingModule {
}

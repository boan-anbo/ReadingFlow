import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ZoteroBrowserComponent} from './zotero-browser.component';
import {ROUTES} from '../../ROUTES';
import {ROUTE_OUTLET} from '../../consts/route-outlets';

const routes: Routes = [
  {
    path: ROUTES.ZOTERO_BROWSER,
    component: ZoteroBrowserComponent
  },

  {
    path: ROUTES.ZOTERO_BROWSER,
    component: ZoteroBrowserComponent,
    outlet: ROUTE_OUTLET.SECONDARY.toString()
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoteroBrowserRoutingModule {
}

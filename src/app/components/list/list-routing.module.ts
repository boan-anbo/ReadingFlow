import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListViewerComponent} from './list-viewer.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  {
    path: ROUTES.LIST_VIEWER,
    component: ListViewerComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}

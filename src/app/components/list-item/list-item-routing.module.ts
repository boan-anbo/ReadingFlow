import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListItemComponent} from './list-item.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}

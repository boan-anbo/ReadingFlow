import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoutineItemComponent} from './routine-item.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  // {
  //   path: ROUTES.ROUTINE_ITEM,
  //   component: RoutineItemComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineItemRoutingModule {
}

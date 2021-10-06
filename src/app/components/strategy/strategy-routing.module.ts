import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StrategyComponent} from './strategy.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  {
    path: ROUTES.STRATEGY,
    component: StrategyComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule {
}

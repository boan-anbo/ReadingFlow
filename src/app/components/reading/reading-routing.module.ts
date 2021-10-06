import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReadingComponent} from './reading.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  {
    path: ROUTES.READING,
    component: ReadingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingRoutingModule {
}

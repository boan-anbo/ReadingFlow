import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '../../ROUTES';
import {ReadingControlComponent} from "./reading-control.component";

const routes: Routes = [
  {
    path: ROUTES.CONTROL,
    component: ReadingControlComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule {
}

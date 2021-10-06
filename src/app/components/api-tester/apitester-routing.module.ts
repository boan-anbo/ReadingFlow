import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ApitesterComponent} from './apitester.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  {
    path: ROUTES.APITESTER,
    component: ApitesterComponent
  },

  {
    path: ROUTES.APITESTER,
    component: ApitesterComponent,
    outlet: 'second'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApitesterRoutingModule {
}

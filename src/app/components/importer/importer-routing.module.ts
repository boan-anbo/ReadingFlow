import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ImporterComponent} from './importer.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  {
    path: ROUTES.IMPORTER,
    component: ImporterComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImporterRoutingModule {
}

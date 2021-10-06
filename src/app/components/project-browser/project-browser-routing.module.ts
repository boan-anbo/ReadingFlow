import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '../../ROUTES';
import {ProjectBrowserComponent} from './project-browser.component';

const routes: Routes = [
  {
    path: ROUTES.PROJECT_BROWSER,
    component: ProjectBrowserComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectBrowserRoutingModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemTaggingComponent} from './item-tagging.component';
import {ROUTES} from '../../ROUTES';

const routes: Routes = [
  // {
    // path: ROUTES.ItemTagging,
    // component: ItemTaggingComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemTaggingRoutingModule {
}

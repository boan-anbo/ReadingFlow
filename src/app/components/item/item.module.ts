import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemComponent} from './item.component';
import {ItemRatingComponent} from './item-rating/item-rating.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ItemComponent, ItemRatingComponent],
  exports: [
    ItemComponent
  ],
    imports: [CommonModule, FormsModule, SharedModule]
})
export class ItemModule {
}

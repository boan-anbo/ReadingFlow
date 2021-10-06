import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './list-item-routing.module';

import { ListItemComponent } from './list-item.component';
import {ItemModule} from "../item/item.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ListItemComponent],
  exports: [
    ListItemComponent
  ],
  imports: [CommonModule, SharedModule, ItemRoutingModule, ItemModule]
})
export class ListItemModule {}

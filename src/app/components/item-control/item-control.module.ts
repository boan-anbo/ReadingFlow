import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemControlComponent} from './item-control.component';
import {ItemModule} from "../item/item.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports: [CommonModule, SharedModule, ItemModule]
})
export class ItemControlModule {}

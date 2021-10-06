import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ItemTaggingComponent } from './item-tagging.component';
import {ItemTaggingRoutingModule} from "./item-tagging-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentheaderModule} from "../component-header/componentheader.module";

@NgModule({
  declarations: [ItemTaggingComponent],
  exports: [
    ItemTaggingComponent
  ],
    imports: [CommonModule, ItemTaggingRoutingModule, ReactiveFormsModule, FormsModule, ComponentheaderModule]
})
export class ItemTaggingModule {}

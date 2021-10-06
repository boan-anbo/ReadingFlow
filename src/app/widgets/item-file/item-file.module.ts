import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFileComponent } from './item-file.component';



@NgModule({
  declarations: [
    ItemFileComponent
  ],
  exports: [
    ItemFileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItemFileModule { }

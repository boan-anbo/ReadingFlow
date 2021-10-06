import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNameInputComponent } from './add-name-input.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddNameInputComponent
  ],
  exports: [
    AddNameInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class AddNameInputModule { }

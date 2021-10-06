import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StatusComponent } from './status.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [StatusComponent],
  exports: [
    StatusComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class StatusModule {}

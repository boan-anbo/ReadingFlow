import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineItemRoutingModule } from './routine-item-routing.module';

import { RoutineItemComponent } from './routine-item.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [RoutineItemComponent],
  exports: [
    RoutineItemComponent
  ],
  imports: [CommonModule, RoutineItemRoutingModule]
})
export class RoutineItemModule {}

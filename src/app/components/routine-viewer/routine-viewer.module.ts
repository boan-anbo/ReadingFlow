import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineViewerRoutingModule } from './routine-viewer-routing.module';

import { RoutineViewerComponent } from './routine-viewer.component';
import {SharedModule} from "../../shared/shared.module";
import { CreateRoutineItemComponent } from './create-routine-item/create-routine-item.component';

@NgModule({
  declarations: [RoutineViewerComponent, CreateRoutineItemComponent],
  imports: [CommonModule, SharedModule, RoutineViewerRoutingModule]
})
export class RoutineViewerModule {}

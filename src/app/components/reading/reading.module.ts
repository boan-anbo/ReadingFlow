import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingRoutingModule } from './reading-routing.module';

import { ReadingComponent } from './reading.component';
import {SharedModule} from "../../shared/shared.module";
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";

@NgModule({
  declarations: [ReadingComponent],
  exports: [
    ReadingComponent
  ],
  imports: [CommonModule, SharedModule, ReadingRoutingModule, ComponentheaderModule]
})
export class ReadingModule {}

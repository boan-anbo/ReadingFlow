import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReadingControlComponent} from "./reading-control.component";
import {ReadingRoutingModule} from "../reading/reading-routing.module";
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [ReadingControlComponent],
  exports: [
    ReadingControlComponent
  ],
  imports: [CommonModule, SharedModule, ReadingRoutingModule, ComponentheaderModule]
})
export class ReadingControlModule {}

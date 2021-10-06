import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramViewerRoutingModule } from './program-viewer-routing.module';

import { ProgramViewerComponent } from './program-viewer.component';
import {SharedModule} from "../../shared/shared.module";
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";
import {VirtualScrollerModule} from "ngx-virtual-scroller";
import {ProgramListItemModule} from "../program-list-item/program-list-item.module";

@NgModule({
  declarations: [ProgramViewerComponent],
  exports: [
    ProgramViewerComponent
  ],
  imports: [CommonModule, SharedModule, ProgramViewerRoutingModule, ComponentheaderModule, VirtualScrollerModule, ProgramListItemModule]
})
export class ProgramViewerModule {}

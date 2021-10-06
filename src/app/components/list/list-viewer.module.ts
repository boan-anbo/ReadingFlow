import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListRoutingModule} from './list-routing.module';

import {ListViewerComponent} from './list-viewer.component';
import {ImporterModule} from "../importer/importer.module";
import {ListItemModule} from "../list-item/list-item.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";
import {VirtualScrollerModule} from "ngx-virtual-scroller";
import {SharedModule} from "../../shared/shared.module";
import {ListInfoModule} from "./list-info/list-info.module";

@NgModule({
  declarations: [ListViewerComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule,
    ImporterModule, ListItemModule, ScrollingModule, ComponentheaderModule, VirtualScrollerModule,
    ListInfoModule
  ]
})
export class ListViewerModule {
}

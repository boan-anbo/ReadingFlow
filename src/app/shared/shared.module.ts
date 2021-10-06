import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {PageNotFoundComponent} from './components/';
import {WebviewDirective} from './directives/';
import {FormsModule} from '@angular/forms';
import {AddNameInputModule} from "../widgets/add-name-input/add-name-input.module";
import {ComponentheaderModule} from "../widgets/component-header/componentheader.module";
import {ItemTaggingModule} from "../widgets/item-tagging/item-tagging.module";
import {ItemTagsModule} from "../widgets/item-tags/item-tags.module";
import {ItemTagsComponent} from "../widgets/item-tags/item-tags.component";
import {ItemFileModule} from "../widgets/item-file/item-file.module";
import {ProgramItemDetailModule} from "../widgets/program-item-detail/program-item-detail.module";
import {RoutineItemModule} from "../components/routine-item/routine-item.module";
import {VirtualScrollerModule} from "ngx-virtual-scroller";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    AddNameInputModule,
    ComponentheaderModule,
    ItemTaggingModule,
    ItemTagsModule,
    ItemFileModule,
    ProgramItemDetailModule,
    RoutineItemModule,

    VirtualScrollerModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    AddNameInputModule,
    ComponentheaderModule,
    ItemTaggingModule,
    ItemTagsModule,
    ItemFileModule,
    ProgramItemDetailModule,
    RoutineItemModule,
    VirtualScrollerModule
  ]
})
export class SharedModule {
}

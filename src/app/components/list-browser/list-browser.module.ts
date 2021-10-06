import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListBrowserComponent} from './list-browser.component';
import {ListBrowserRoutingModule} from './list-browser-routing.module';
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ListBrowserComponent],
  imports: [CommonModule, SharedModule, ListBrowserRoutingModule, ComponentheaderModule]
})
export class ListBrowserModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../../shared/shared.module";
import {ProjectBrowserComponent} from "./project-browser.component";
import {ProjectBrowserRoutingModule} from "./project-browser-routing.module";
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";

@NgModule({
  declarations: [ProjectBrowserComponent],
  imports: [CommonModule, SharedModule, ProjectBrowserRoutingModule, ComponentheaderModule]
})
export class ProjectBrowserModule {
}

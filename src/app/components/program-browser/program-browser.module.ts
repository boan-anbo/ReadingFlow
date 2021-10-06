import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramBrowserComponent} from './program-browser.component';
import {ProgramBrowserRoutingModule} from './program-browser-routing.module';
import {ComponentheaderModule} from "../../widgets/component-header/componentheader.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ProgramBrowserComponent],
  imports: [CommonModule, SharedModule, ProgramBrowserRoutingModule, ComponentheaderModule]
})
export class ProgramBrowserModule {
}

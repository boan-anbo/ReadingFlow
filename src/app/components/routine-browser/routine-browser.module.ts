import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineBrowserRoutingModule } from './routine-browser-routing.module';

import { RoutineBrowserComponent } from './routine-browser.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [RoutineBrowserComponent],
  imports: [CommonModule, SharedModule, RoutineBrowserRoutingModule]
})
export class RoutineBrowserModule {}

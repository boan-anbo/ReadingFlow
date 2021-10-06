import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidepanelRoutingModule } from './sidepanel-routing.module';

import { SidepanelComponent } from './sidepanel.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [SidepanelComponent],
  exports: [
    SidepanelComponent
  ],
  imports: [CommonModule, SharedModule, SidepanelRoutingModule]
})
export class SidepanelModule {}

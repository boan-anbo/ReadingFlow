import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApitesterRoutingModule } from './apitester-routing.module';

import { ApitesterComponent } from './apitester.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ApitesterComponent],
  imports: [CommonModule, SharedModule, ApitesterRoutingModule]
})
export class ApitesterModule {}

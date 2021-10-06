import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PgcRoutingModule } from './pgc-routing.module';

import { PgcComponent } from './pgc.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [PgcComponent],
  exports: [
    PgcComponent
  ],
  imports: [CommonModule, SharedModule, PgcRoutingModule]
})
export class PgcModule {}

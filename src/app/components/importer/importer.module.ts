import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImporterRoutingModule } from './importer-routing.module';

import { ImporterComponent } from './importer.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ImporterComponent],
  exports: [
    ImporterComponent
  ],
  imports: [CommonModule, SharedModule, ImporterRoutingModule]
})
export class ImporterModule {}

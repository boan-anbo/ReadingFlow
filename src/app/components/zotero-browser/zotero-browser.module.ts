import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoteroBrowserRoutingModule } from './zotero-browser-routing.module';

import { ZoteroBrowserComponent } from './zotero-browser.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ZoteroBrowserComponent],
  imports: [CommonModule, SharedModule, ZoteroBrowserRoutingModule]
})
export class ZoteroBrowserModule {}

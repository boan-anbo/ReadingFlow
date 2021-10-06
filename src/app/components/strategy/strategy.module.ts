import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategyRoutingModule } from './strategy-routing.module';

import { StrategyComponent } from './strategy.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [StrategyComponent],
  imports: [CommonModule, SharedModule, StrategyRoutingModule]
})
export class StrategyModule {}

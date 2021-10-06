import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentheaderComponent} from './componentheader.component';

@NgModule({
  declarations: [ComponentheaderComponent],
  exports: [
    ComponentheaderComponent
  ],
  imports: [CommonModule]
})
export class ComponentheaderModule {
}

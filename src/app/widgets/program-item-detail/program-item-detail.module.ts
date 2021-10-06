import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramItemDetailComponent } from './program-item-detail.component';



@NgModule({
    declarations: [
        ProgramItemDetailComponent
    ],
    exports: [
        ProgramItemDetailComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProgramItemDetailModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTagsComponent } from './item-tags.component';



@NgModule({
    declarations: [
        ItemTagsComponent
    ],
    exports: [
        ItemTagsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ItemTagsModule { }

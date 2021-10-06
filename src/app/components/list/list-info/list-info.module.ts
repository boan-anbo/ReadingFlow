import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInfoComponent } from './list-info.component';
import { ListLinksComponent } from './list-links/list-links.component';



@NgModule({
    declarations: [
        ListInfoComponent,
        ListLinksComponent
    ],
    exports: [
        ListInfoComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ListInfoModule { }

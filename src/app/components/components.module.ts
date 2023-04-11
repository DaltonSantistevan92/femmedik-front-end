import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavComponent } from "./nav/nav.component";
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";


@NgModule({
    declarations: [
        NavComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule
    ],
    exports : [
        NavComponent
    ]
})
export class ComponentsModule { }

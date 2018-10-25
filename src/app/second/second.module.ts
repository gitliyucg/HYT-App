import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetsModule} from "../widgets/widgets.module";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SecondComponent} from './second.component'

const router: Routes = [
    {path: '', component: SecondComponent}
]

@NgModule({
    imports: [
        CommonModule,
        WidgetsModule,
        ReactiveFormsModule,
        RouterModule.forChild(router)
    ],
    declarations: [SecondComponent]
})
export class SecondModule { }

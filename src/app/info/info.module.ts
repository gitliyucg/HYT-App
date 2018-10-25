import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetsModule} from '../widgets/widgets.module';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {InfoComponent} from './info.component';

const router: Routes = [
    {path: '', component: InfoComponent}
]

@NgModule({
    imports: [
        CommonModule,
        WidgetsModule,
        ReactiveFormsModule,
        RouterModule.forChild(router)
    ],
    declarations: [InfoComponent]
})
export class InfoModule {
}

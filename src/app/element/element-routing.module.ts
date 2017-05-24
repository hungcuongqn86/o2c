import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {ElementComponent}    from './element.component';
import {ElementDetailComponent} from  './element-detail.component';

const routes: Routes = [
    {path: '', component: ElementComponent},
    {path: 'edit/:id', component: ElementDetailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class ElementRoutingModule {
    constructor() {
    }
}
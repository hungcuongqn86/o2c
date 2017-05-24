import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {ElementComponent}    from './element.component';

const routes: Routes = [
    {path: '', component: ElementComponent},
    {path: 'edit/:id', component: ElementComponent},
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
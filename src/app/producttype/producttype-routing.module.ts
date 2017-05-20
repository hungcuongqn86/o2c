import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {ProducttypeComponent}    from './producttype.component';

const routes: Routes = [
    {path: '', component: ProducttypeComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class ProducttypeRoutingModule {
    constructor() {
    }
}
import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {ProducttypeComponent}    from './producttype.component';
import {ProducttypeDetailComponent}    from './producttype-detail.component';

const routes: Routes = [
    {path: '', component: ProducttypeComponent},
    {path: 'add', component: ProducttypeDetailComponent},
    {path: 'edit/:id', component: ProducttypeDetailComponent},
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
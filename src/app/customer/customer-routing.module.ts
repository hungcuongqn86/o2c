import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {CustomerComponent}    from './customer.component';
import {CustomerAddComponent}    from './customer-add.component';

const routes: Routes = [
    {path: '', component: CustomerComponent},
    {path: 'add', component: CustomerAddComponent},
    {path: 'edit/:id', component: CustomerAddComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class CustomerRoutingModule {
    constructor() {
    }
}
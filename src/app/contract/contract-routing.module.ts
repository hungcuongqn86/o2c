import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {ContractComponent}    from './contract.component';
import {ContractAddComponent}    from './contract-add.component';

const routes: Routes = [
    {path: '', component: ContractComponent},
    {path: 'add', component: ContractAddComponent},
    {path: 'edit/:id', component: ContractAddComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class ContractRoutingModule {
    constructor() {
    }
}
import {NgModule}            from '@angular/core';
import {Routes, RouterModule}        from '@angular/router';

import {ContractComponent}    from './contract.component';

const routes: Routes = [
    {path: '', component: ContractComponent},
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
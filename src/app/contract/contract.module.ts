import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {HttpModule}          from '@angular/http';
import {HttpClient}         from '../http-client';

import {ContractComponent}    from './contract.component';
import {ContractRoutingModule}    from './contract-routing.module';

@NgModule({
    imports: [CommonModule, FormsModule, ContractRoutingModule, HttpModule],
    declarations: [
        ContractComponent
    ],
    providers: [HttpClient]
})
export class ContractModule {
}
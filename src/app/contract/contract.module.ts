import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {HttpModule}          from '@angular/http';
import {HttpClient}         from '../http-client';
import {TranslateModule} from "ng2-translate/ng2-translate";
import {NgUploaderModule} from 'ngx-uploader';
import {SharedModule} from '../public/shared.module';

import {ContractComponent}    from './contract.component';
import {ContractAddComponent}    from './contract-add.component';
import {ContractRoutingModule}    from './contract-routing.module';
import {contractService}    from  './contract.service';

@NgModule({
    imports: [CommonModule, FormsModule, ContractRoutingModule, HttpModule, TranslateModule, NgUploaderModule, SharedModule],
    declarations: [
        ContractComponent,
        ContractAddComponent
    ],
    providers: [HttpClient, contractService]
})
export class ContractModule {
}
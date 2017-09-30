import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {HttpModule}          from '@angular/http';
import {HttpClient}         from '../http-client';
import {TranslateModule} from "ng2-translate/ng2-translate";
import {NgUploaderModule} from 'ngx-uploader';
import {SharedModule} from '../public/shared.module';

import {CustomerComponent}    from './customer.component';
import {CustomerAddComponent}    from './customer-add.component';
import {CustomerRoutingModule}    from './customer-routing.module';
import {CustomerService}    from  './customer.service';

@NgModule({
    imports: [CommonModule, FormsModule, CustomerRoutingModule, HttpModule, TranslateModule, NgUploaderModule, SharedModule],
    declarations: [
        CustomerComponent,
        CustomerAddComponent
    ],
    providers: [HttpClient, CustomerService]
})
export class CustomerModule {
}
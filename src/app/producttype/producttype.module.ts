import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {HttpModule}          from '@angular/http';
import {HttpClient}         from '../http-client';
import {TranslateModule} from "ng2-translate/ng2-translate";

import {ProducttypeComponent}    from './producttype.component';
import {ProducttypeDetailComponent}    from './producttype-detail.component';
import {ProducttypeRoutingModule}    from './producttype-routing.module';
import {producttypeService}    from  './producttype.service';

@NgModule({
    imports: [CommonModule, FormsModule, ProducttypeRoutingModule, HttpModule, TranslateModule],
    declarations: [
        ProducttypeComponent,
        ProducttypeDetailComponent
    ],
    providers: [HttpClient, producttypeService]
})
export class ProducttypeModule {
}
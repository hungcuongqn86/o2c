import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';
import {HttpModule}          from '@angular/http';
import {HttpClient}         from '../http-client';
import {TranslateModule} from "ng2-translate/ng2-translate";

import {ElementComponent}    from './element.component';
import {ElementDetailComponent} from  './element-detail.component';
import {ElementRoutingModule}    from './element-routing.module';
import {ElementService}    from  './element.service';

@NgModule({
    imports: [CommonModule, FormsModule, ElementRoutingModule, HttpModule, TranslateModule],
    declarations: [
        ElementComponent,
        ElementDetailComponent
    ],
    providers: [HttpClient, ElementService]
})
export class ElementModule {
}
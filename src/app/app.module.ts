import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {AppService} from  './app.service'
import {HttpClient}           from './http-client';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate/ng2-translate";
import {Ng2PaginationModule}  from 'ng2-pagination';

/* Routing Module */
import {routing, appRoutingProviders}   from './app-routing.module';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './list/list.component';
import {ListService} from './list/list.service';
import {UserComponent} from './user/user.component';
import {userService}    from  './user/user.service';
import {CustomerComponent} from './customer/customer.component';
import { ReportComponent } from './report/report.component';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        RecordComponent,
        ListComponent,
        UserComponent,
        CustomerComponent,
        ReportComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        Ng2PaginationModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        HttpClient,
        AppService,
        ListService,
        userService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

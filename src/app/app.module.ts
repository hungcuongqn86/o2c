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
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DatePickerModule} from 'ng2-datepicker-bootstrap';
import {ConfirmComponent} from './confirm.component';
import {AlertComponent} from './alert.component';

/* Routing Module */
import {routing, appRoutingProviders}   from './app-routing.module';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './list/list.component';
import {ListService} from './list/list.service';
import {UserComponent} from './user/user.component';
import {userService}    from  './user/user.service';
import {CustomerComponent} from './customer/customer.component';
import {ReportComponent} from './report/report.component';

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
        ReportComponent,
        ConfirmComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        DatePickerModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        Ng2PaginationModule,
        BootstrapModalModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        HttpClient,
        AppService,
        ListService,
        userService
    ],
    //Don't forget to add the component to entryComponents section
    entryComponents: [
        ConfirmComponent,
        AlertComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

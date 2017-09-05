import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './layouts/header.component';
import {FooterComponent} from './layouts/footer.component';
import {IndexComponent} from './index/index.component';
import {ErrorComponent} from './error/error.component';
import {AppService} from  './app.service'
import {HttpClient}           from './http-client';
import {Lib} from './lib/lib';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate/ng2-translate";
import {Ng2PaginationModule}  from 'ng2-pagination';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from './confirm.component';
import {AlertComponent} from './alert.component';
import {ProductDetailComponent} from './contract/product-detail.component';
import {ProductCommandComponent} from './contract/product-command.component';

/* Routing Module */
import {routing, appRoutingProviders}   from './app-routing.module';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './list/list.component';
import {ListService} from './list/list.service';
import {UserComponent} from './user/user.component';
import {userService}    from  './user/user.service';
import {cmdEl, productService} from  './contract/product.service';
import {CustomerComponent} from './customer/customer.component';
import {ReportComponent} from './report/report.component';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ErrorComponent,
        IndexComponent,
        RecordComponent,
        ListComponent,
        UserComponent,
        CustomerComponent,
        ReportComponent,
        ConfirmComponent,
        AlertComponent,
        ProductDetailComponent,
        ProductCommandComponent
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
        BootstrapModalModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        HttpClient,
        Lib,
        AppService,
        ListService,
        userService,
        cmdEl,
        productService
    ],
    //Don't forget to add the component to entryComponents section
    entryComponents: [
        ConfirmComponent,
        AlertComponent,
        ProductDetailComponent,
        ProductCommandComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

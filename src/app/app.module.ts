import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate/ng2-translate";

/* Routing Module */
import {routing, appRoutingProviders}   from './app-routing.module';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './public/i18n', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent
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
        routing
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

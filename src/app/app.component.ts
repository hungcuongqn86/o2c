import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs/Rx';

import {AppService} from  './app.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private translate: TranslateService, private AppService:AppService) {
        translate.addLangs(["vi"]);
        let browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/vi/) ? browserLang : 'vi');
    }

    ngOnInit() {
        this.getMenu();
    }

    getMenu(){
        this.AppService.getMenu().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.error("Not menu!");
                return Observable.throw(error);
            }
        );
    }

    trans(key: string) {
        let tran: string = key;
        this.translate.get(key, {value: 'world'}).subscribe((res: string) => {
            tran = res;
        });
        return tran;
    }
}

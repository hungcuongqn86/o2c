import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(["vi"]);
        let browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/vi/) ? browserLang : 'vi');
    }

    trans(key: string) {
        let tran: string = key;
        this.translate.get(key, {value: 'world'}).subscribe((res: string) => {
            tran = res;
        });
        return tran;
    }
}

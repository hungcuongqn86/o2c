import {Component} from '@angular/core';

@Component({
    selector: 'app-layouts-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    constructor() {
    }

    public logout() {
        let token = document.querySelector('meta[property="csrf-token"]')['content'];
        (<HTMLInputElement>document.getElementById('_token')).value = token;
        (<HTMLFormElement>document.getElementById('logout-form')).submit();
    }
}

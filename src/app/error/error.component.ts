import {Component} from '@angular/core';
declare const $: any;
@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})

export class ErrorComponent {
    constructor() {
    }

    ngAfterViewInit() {
        $(function () {
            $.AdminLTE.layout.fix();
        });
    }
}

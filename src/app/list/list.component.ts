import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {ListService} from './list.service';

declare let $: any;

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    listtype: any = [];
    listdata: any = [];

    constructor(private ListService: ListService) {
    }

    ngOnInit() {
        this.getListType();
        this.getListData();
    }

    getListType() {
        this.ListService.getListType().subscribe(
            data => {
                this.listtype = data;
            },
            error => {
                console.error("Not menu!");
                return Observable.throw(error);
            }
        );
    }

    getListData() {
        this.ListService.getListData().subscribe(
            data => {
                this.listdata = data;
            },
            error => {
                console.error("Not menu!");
                return Observable.throw(error);
            }
        );
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
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
    total: number = -1;
    searchparam: any = JSON.parse('{"listtype_s":"","sSortCol":"code","sSortDir":"asc","page":1,"limit":10}');

    constructor(private ListService: ListService) {
    }

    ngOnInit() {
        this.getListType();
        this.getListData(this.searchparam);
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

    getListData(filter:any) {
        this.ListService.getListData(filter).subscribe(
            data => {
                this.listdata = data.data;
                this.total = data.total;
            },
            error => {
                console.error("Not menu!");
                return Observable.throw(error);
            }
        );
    }

    private getPage(page: number) {
        this.searchparam.page = page;
        this.getListData(this.searchparam);
    }

    private selectListType(){
        this.getListData(this.searchparam);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}

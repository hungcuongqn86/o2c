import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Observable} from 'rxjs/Rx';

import {ListService} from '../list/list.service';
import {userService}    from  './user.service';

declare let $: any;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @ViewChild('form') form: NgModel;
    listtype: any = [];
    listdata: any = [];
    total: number = -1;
    searchparam: any = JSON.parse('{"listtype_s":"DEPARTMENT","sSortCol":"code","sSortDir":"asc","page":1,"limit":10}');
    list: any = JSON.parse('{"id":0,"listtype_code":"","code":"","name":"","enabled":1}');
    viewmode: boolean = false;
    actionmode: string = 'LIST';
    roles:any = [];

    res: any;

    constructor(private ListService: ListService, private userService: userService) {
    }

    ngOnInit() {
        this.getRoles();
        let listfilter: any = JSON.parse('{"listtype_s":"DEPARTMENT","sSortCol":"code","sSortDir":"asc","page":1,"limit":1000}');
        this.getListData(listfilter);
    }

    getListData(filter: any) {
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

    getRoles(){
        this.userService.getRoles().subscribe(
            data => {
                this.roles = data;
            },
            error => {
                console.error("Not role!");
                return Observable.throw(error);
            }
        );
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}

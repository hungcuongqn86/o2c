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
    userdata: any = [];
    total: number = -1;
    searchparam: any = JSON.parse('{"department_s":"","sSortCol":"code","sSortDir":"asc","page":1,"limit":10}');
    user: any = JSON.parse('{"id":0,"department_code":"","name":"","email":"","password":"","role":"","enabled":1}');
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
        this.getUserData(this.searchparam);
    }

    getListData(filter: any) {
        this.ListService.getListData(filter).subscribe(
            data => {
                this.listdata = data.data;
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

    getUserData(filter: any) {
        this.userService.getUsersData(filter).subscribe(
            data => {
                this.userdata = data.data;
                this.total = data.total;
            },
            error => {
                console.error("Not user!");
                return Observable.throw(error);
            }
        );
    }

    private selectDepartment() {
        this.searchparam.page = 1;
        this.getUserData(this.searchparam);
    }

    private addUser() {
        //this.form.reset();
        /*this.form['controls']['code'].reset();
        this.form['controls']['name'].reset();*/
        this.viewmode = true;
        this.actionmode = 'ADD';
        /*this.list.id = 0;
        this.list.listtype_code = this.searchparam.listtype_s;
        this.list.enabled = 1;*/
    }

    private goBack() {
        this.viewmode = false;
        this.actionmode = 'LIST';
    }

    private getPage(page: number) {
        this.searchparam.page = page;
        this.getUserData(this.searchparam);
    }

    private editUser(id: string) {
        this.viewmode = true;
        this.actionmode = 'EDIT';
        this.getUser(id);
    }

    private getUser(id:string){
        /*this.ListService.getList(id).subscribe(
            data => {
                this.list = data;
            },
            error => {
                console.error("Not record!");
                return Observable.throw(error);
            }
        );*/
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}

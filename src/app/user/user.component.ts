import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms'
import {ConfirmComponent} from '../confirm.component';
import {DialogService} from "ng2-bootstrap-modal";
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
    searchparam: any = JSON.parse('{"department_s":"","sSortCol":"code","sSortDir":"asc","page":1,"limit":15}');
    user: any = JSON.parse('{"id":0,"department_code":"","name":"","email":"","password":"","role":"","enabled":1}');
    viewmode: boolean = false;
    actionmode: string = 'LIST';
    roles: any = [];
    roleSelected: Array<any> = [];

    res: any;

    constructor(private ListService: ListService, private userService: userService, private dialogService:DialogService) {
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

    getRoles() {
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
        this.form['controls']['name'].reset();
        this.form['controls']['email'].reset();
        this.form['controls']['password'].reset();
        this.viewmode = true;
        this.actionmode = 'ADD';
        this.user.id = 0;
        if (this.searchparam.department_s != '') {
            this.user.department_code = this.searchparam.department_s;
        } else {
            this.form['controls']['department_code'].reset();
        }
        this.user.enabled = 1;
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

    private getUser(id: string) {
        this.userService.getSingle(id).subscribe(
            data => {
                this.user = data;
                if (this.user.role != '') {
                    this.roleSelected = this.user.role.split(',');
                }
            },
            error => {
                console.error("Not user!");
                return Observable.throw(error);
            }
        );
    }

    private saveRecord() {
        this.viewmode = false;
        this.actionmode = 'LIST';
        if (this.roleSelected.length > 0) {
            this.user.role = this.roleSelected.join(',');
        } else {
            this.user.role = '';
        }
        this.userService.saveRecord(this.user).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.getUserData(this.searchparam);
                } else if (res.error == true) {
                    console.error(res.message[0]);
                }
            },
            error => {
                console.error("Save Error!");
                return Observable.throw(error);
            }
        );
    }

    checkedItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.roleSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.roleSelected.indexOf(value);
            if (indexx >= 0) {
                this.roleSelected.splice(indexx, 1);
            }
        }
    }

    private deleteRecord() {
        this.viewmode = false;
        this.actionmode = 'LIST';
        this.userService.deleteRecord(this.user.id).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.getUserData(this.searchparam);
                } else if (res.error == true) {
                    console.error(res.message[0]);
                }
            },
            error => {
                console.error("Add Error!");
                return Observable.throw(error);
            }
        );
    }

    private showConfirm() {
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title:'Xác nhận xóa dữ liệu',
            message:'Bạn chắc chắn muốn xóa người dùng này!'})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteRecord();
                }
            });
        setTimeout(()=>{
            disposable.unsubscribe();
        },10000);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}

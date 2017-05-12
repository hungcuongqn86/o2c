import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ConfirmComponent} from '../confirm.component';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

import {ListService} from './list.service';

declare let $: any;

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @ViewChild('form') form: NgModel;
    listtype: any = [];
    listdata: any = [];
    total: number = -1;
    searchparam: any = JSON.parse('{"listtype_s":"DEPARTMENT","sSortCol":"code","sSortDir":"asc","page":1,"limit":10}');
    list: any = JSON.parse('{"id":0,"listtype_code":"","code":"","name":"","enabled":1}');
    viewmode: boolean = false;
    actionmode: string = 'LIST';

    res: any;

    constructor(private ListService: ListService, private dialogService:DialogService) {
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

    private getPage(page: number) {
        this.searchparam.page = page;
        this.getListData(this.searchparam);
    }

    private selectListType() {
        this.searchparam.page = 1;
        this.getListData(this.searchparam);
    }

    private addList() {
        //this.form.reset();
        this.form['controls']['code'].reset();
        this.form['controls']['name'].reset();
        this.viewmode = true;
        this.actionmode = 'ADD';
        this.list.id = 0;
        this.list.listtype_code = this.searchparam.listtype_s;
        this.list.enabled = 1;
    }

    private editList(id: string) {
        this.viewmode = true;
        this.actionmode = 'EDIT';
        this.getList(id);
    }

    private getList(id:string){
        this.ListService.getList(id).subscribe(
            data => {
                this.list = data;
            },
            error => {
                console.error("Not record!");
                return Observable.throw(error);
            }
        );
    }

    private deleteList(){
        this.viewmode = false;
        this.actionmode = 'LIST';
        this.ListService.deleteList(this.list.id).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.getListData(this.searchparam);
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
            message:'Bạn chắc chắn muốn xóa đối tượng này!'})
            .subscribe((isConfirmed)=>{
                if(isConfirmed) {
                    this.deleteList();
                }
            });
        setTimeout(()=>{
            disposable.unsubscribe();
        },10000);
    }

    private saveList() {
        this.viewmode = false;
        this.actionmode = 'LIST';
        this.ListService.saveList(this.list).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.getListData(this.searchparam);
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

    private goBack() {
        this.viewmode = false;
        this.actionmode = 'LIST';
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}

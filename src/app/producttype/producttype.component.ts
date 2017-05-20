import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {producttypeService}    from  './producttype.service';
import {ConfirmComponent} from '../confirm.component';
import {AlertComponent} from '../alert.component';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-producttype',
    templateUrl: './producttype.component.html',
    styleUrls: ['./producttype.component.css']
})

export class ProducttypeComponent implements OnInit {
    listdata: any = [];
    from: number = 0;
    to: number = 0;
    total: number = 0;
    current_page: number = 1;
    last_page: number = 1;
    searchparam: any = JSON.parse('{"searchInput":"","sSortCol":"code","sSortDir":"asc","page":1,"limit":15}');

    checklist: Array<any> = [];
    checkall: boolean = false;
    res: any;

    constructor(private producttypeService: producttypeService, private dialogService: DialogService,private router: Router) {

    }

    ngOnInit() {
        this.getProducttypesData(this.searchparam);
    }

    getProducttypesData(filter: any) {
        this.producttypeService.getProducttypesData(filter).subscribe(
            data => {
                this.listdata = data.data;
                this.total = data.total;
                this.from = data.from;
                this.to = data.to;
                this.current_page = data.current_page;
                this.last_page = data.last_page;
            },
            error => {
                console.error("Not contract!");
                return Observable.throw(error);
            }
        );
    }

    pagePrev() {
        if (this.current_page > 1) {
            this.current_page--;
            this.searchparam.page = this.current_page;
            this.getProducttypesData(this.searchparam);
        }
    }

    pageNext() {
        if (this.current_page < this.last_page) {
            this.current_page++;
            this.searchparam.page = this.current_page;
            this.getProducttypesData(this.searchparam);
        }
    }

    search() {
        this.searchparam.page = 1;
        this.getProducttypesData(this.searchparam);
    }

    checkboxtoggle() {
        if (this.checkall) {
            this.checkall = false;
            this.checklist = [];
            for (let i = 0; i < this.listdata.length; i++) {
                let value: number = this.listdata[i].id;
                (<HTMLInputElement>document.getElementById(value.toString())).checked = false;
            }
        } else {
            this.checkall = true;
            this.checklist = [];
            for (let i = 0; i < this.listdata.length; i++) {
                let value: number = this.listdata[i].id;
                (<HTMLInputElement>document.getElementById(value.toString())).checked = true;
                this.checklist.push(value);
            }
        }
    }

    checkedItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.checklist.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.checklist.indexOf(value);
            if (indexx >= 0) {
                this.checklist.splice(indexx, 1);
            }
        }
    }

    private showAlert(message:string) {
        this.dialogService.addDialog(AlertComponent, {title: 'Thông báo!', message: message})
            .subscribe(() => {
                //console.log(111111);
            });
    }

    private showConfirm() {
        if (this.checklist.length == 0) {
            this.showAlert('Bạn phải chọn hợp đồng muốn xóa!');
            return false;
        }
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Xác nhận xóa dữ liệu',
            message: 'Bạn chắc chắn muốn xóa hợp đồng này!'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteRecord();
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    private editRecord(){
        if (this.checklist.length == 1) {
            this.router.navigate(['/contract/edit',this.checklist[0]]);
        }
    }

    private deleteRecord() {
        let idlist:string='';
        if (this.checklist.length > 0) {
            idlist = this.checklist.join(',');
        }
        this.producttypeService.deleteRecord(idlist).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.getProducttypesData(this.searchparam);
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

    private addContract(){
        this.router.navigate(['/contract/add']);
    }
}

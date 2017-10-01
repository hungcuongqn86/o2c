import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {CustomerService} from  './customer.service';
import {ConfirmComponent} from '../confirm.component';
import {AlertComponent} from '../alert.component';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-customer-add',
    templateUrl: './customer-add.component.html',
    styleUrls: ['./customer.component.css']
})

export class CustomerAddComponent implements OnInit, AfterViewInit {
    titleAction: string = 'COMMON.ADD_LABLE';
    recordId: number = 0;
    detail: any = {
        id: 0,
        code: '',
        type: '',
        name: '',
        gender: '',
        birthday: '',
        address: '',
        phone_number1: '',
        phone_number2: '',
        email: '',
        note: '',
        company_type: '',
        company_fields: '',
        company_code: '',
        company_phone_number: '',
        company_name: '',
        company_email: '',
        company_website: '',
        company_address: '',
        group: '',
        source: ''
    };
    res: any;

    constructor(private translate: TranslateService, private CustomerService: CustomerService, private router: Router, private route: ActivatedRoute, private dialogService: DialogService) {
        this.route.params.forEach((params: Params) => {
            if (params['id'] && params['id'].length) {
                this.recordId = params['id'];
            }
        });
        if (this.recordId) {
            this.titleAction = 'COMMON.EDIT_LABLE';
            this.getDetail(this.recordId.toString());
        }
    }

    ngOnInit() {

    }

    private getDetail(id: string) {
        this.CustomerService.getSingle(id).subscribe(
            data => {
                this.detail = data;
            },
            error => {
                console.error("Not detail!");
                return Observable.throw(error);
            }
        );
    }

    saveRecord() {
        this.CustomerService.saveRecord(this.detail).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.router.navigate(['/customer']);
                } else if (res.error == true) {
                    console.error(res.message[0]);
                }
            },
            error => {
                return Observable.throw(error);
            }
        );
    }

    showConfirm() {
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Xác nhận xóa dữ liệu',
            message: 'Bạn chắc chắn muốn xóa khách hàng này!'
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

    private deleteRecord() {
        this.CustomerService.deleteRecord(this.recordId.toString()).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.goBack();
                } else if (res.error == true) {
                    console.error(res.message[0]);
                }
            },
            error => {
                return Observable.throw(error);
            }
        );
    }

    goBack() {
        this.router.navigate(['/customer']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {CustomerService} from  './customer.service';
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
        group: '',
        source: ''
    };

    constructor(private translate: TranslateService, private CustomerService: CustomerService, private router: Router, private route: ActivatedRoute) {
        this.route.params.forEach((params: Params) => {
            if (params['id'] && params['id'].length) {
                this.recordId = params['id'];
            }
        });
        if (this.recordId) {
            this.titleAction = 'COMMON.EDIT_LABLE';
        }
    }

    ngOnInit() {

    }

    private getDetail(id: string) {

    }

    private goBack() {
        this.router.navigate(['/customer']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
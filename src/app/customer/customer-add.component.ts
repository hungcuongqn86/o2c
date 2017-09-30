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

    constructor(private translate: TranslateService, private CustomerService: CustomerService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {

    }

    private getDetail(id: string) {

    }

    private goBack() {
        this.router.navigate(['/contract']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
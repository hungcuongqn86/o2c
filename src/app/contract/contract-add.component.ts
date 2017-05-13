import {Component, ViewChild, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {contractService}    from  './contract.service';
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-contract-add',
    templateUrl: './contract-add.component.html',
    styleUrls: ['./contract.component.css']
})

export class ContractAddComponent implements OnInit {
    @ViewChild('form') form: NgModel;
    detail: any = JSON.parse('{"id":0,"code":"","signdate":"","customer_id":"","content":"","value":"","durationdate":""}');
    customer: any = [];
    res: any;

    constructor(private translate: TranslateService, private contractService: contractService, private router: Router) {

    }

    ngOnInit() {
        this.getCustomersData();
    }

    getCustomersData() {
        this.contractService.getCustomersData().subscribe(
            data => {
                this.customer = data;
            },
            error => {
                console.error("Not customer!");
                return Observable.throw(error);
            }
        );
    }

    private goBack() {
        this.router.navigate(['/contract']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
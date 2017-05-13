import {Component, ViewChild, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
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
    recordId:number=0;
    customer: any = [];
    res: any;

    constructor(private translate: TranslateService, private contractService: contractService, private router: Router, private route: ActivatedRoute) {
        this.route.params.forEach((params: Params) => {
            if(params['id']&&params['id'].length){
                this.recordId = params['id'];
            }
        });
        if(this.recordId){
            this.getDetail(this.recordId.toString());
        }
    }

    ngOnInit() {
        this.getCustomersData();
    }

    private getDetail(id: string) {
        this.contractService.getSingle(id).subscribe(
            data => {
                this.detail = data;
            },
            error => {
                console.error("Not user!");
                return Observable.throw(error);
            }
        );
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

    private saveRecord() {
        this.contractService.saveRecord(this.detail).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    console.log(111);
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

    private goBack() {
        this.router.navigate(['/contract']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
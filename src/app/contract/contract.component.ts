import {Component, OnInit} from '@angular/core';
import {contractService}    from  './contract.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.css']
})

export class ContractComponent implements OnInit {
    listdata:any = [];
    total:number = 0;
    searchparam: any = JSON.parse('{"searchInput":"","sSortCol":"code","sSortDir":"asc","page":1,"limit":15}');
    
    constructor(private contractService: contractService) {

    }

    ngOnInit() {
        this.getContractsData(this.searchparam);
    }

    getContractsData(filter: any) {
        this.contractService.getContractsData(filter).subscribe(
            data => {
                this.listdata = data.data;
                this.total = data.total;
            },
            error => {
                console.error("Not contract!");
                return Observable.throw(error);
            }
        );
    }

    search(){
        this.searchparam.page = 1;
        this.getContractsData(this.searchparam);
    }
}

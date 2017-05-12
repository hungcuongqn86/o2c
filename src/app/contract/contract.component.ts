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
    from:number=0;
    to:number=0;
    total:number = 0;
    current_page:number = 1;
    last_page:number = 1;
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

    pagePrev(){
        if(this.current_page>1){
            this.current_page--;
            this.searchparam.page = this.current_page;
            this.getContractsData(this.searchparam);
        }
    }

    pageNext(){
        if(this.current_page<this.last_page){
            this.current_page++;
            this.searchparam.page = this.current_page;
            this.getContractsData(this.searchparam);
        }
    }

    search(){
        this.searchparam.page = 1;
        this.getContractsData(this.searchparam);
    }
}

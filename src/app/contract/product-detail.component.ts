import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface ProductDetailModel {
    id: number;
    contract_id: number;
    title: string;
}

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./contract.component.css']
})
export class ProductDetailComponent extends DialogComponent<ProductDetailModel, string> implements ProductDetailModel, OnInit {
    id: number;
    contract_id: number;
    title: string;
    message: string = '';
    detail: any = JSON.parse('{"id":0,"contract_id":"","producttype_code":"","count":"","long":"","large":"","high":"","cover_color":"","inside_color":"","cover_paper_type":"","inside_paper_type":"","standard":"","number_page":"","hardcover":"","number_page_annex":"","inside_color_annex":"","inside_paper_type_annex":"","sheet_hung":"","outsource_type":""}');

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        this.detail.contract_id = this.contract_id;
        console.log(this.detail);
    }

    apply() {
        this.result = this.message;
        this.close();
    }
}

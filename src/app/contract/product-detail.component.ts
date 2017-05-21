import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {productService} from  './product.service';
import {Observable} from 'rxjs/Rx';

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
    producttype: any = [];

    constructor(dialogService: DialogService, private productService: productService) {
        super(dialogService);
    }

    ngOnInit() {
        this.detail.contract_id = this.contract_id;
        this.getProducttypes();
        this.getListData();
    }

    private getProducttypes() {
        this.productService.getProducttypesData().subscribe(
            data => {
                this.producttype = data.data;
            },
            error => {
                console.error("Not producttype!");
                return Observable.throw(error);
            }
        );
    }

    private getListData() {
        this.productService.getListData().subscribe(
            data => {
                this.genListData(data.data);
            },
            error => {
                console.error("Not menu!");
                return Observable.throw(error);
            }
        );
    }

    standardList: any = [];
    print_colorList: any = [];
    paper_typeList: any = [];

    outsourcingList: any = [];
    packingList: any = [];
    moldList: any = [];
    number_handList: any = [];
    print_typeList: any = [];
    print_sizeList: any = [];

    zinc_typeList: any = [];
    machineList: any = [];

    size_storeList: any = [];
    cut_typeList: any = [];
    number_charList: any = [];

    private genListData(data: any) {
        Object.keys(data).map((key) => {
            if (data[key].listtype_code == 'standard') {
                this.standardList.push(data[key]);
            }
            if (data[key].listtype_code == 'print_color') {
                this.print_colorList.push(data[key]);
            }
            if (data[key].listtype_code == 'paper_type') {
                this.paper_typeList.push(data[key]);
            }


            if (data[key].listtype_code == 'outsourcing') {
                this.outsourcingList.push(data[key]);
            }
            if (data[key].listtype_code == 'packing') {
                this.packingList.push(data[key]);
            }
            if (data[key].listtype_code == 'mold') {
                this.moldList.push(data[key]);
            }
            if (data[key].listtype_code == 'number_hand') {
                this.number_handList.push(data[key]);
            }
            if (data[key].listtype_code == 'print_type') {
                this.print_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'print_size') {
                this.print_sizeList.push(data[key]);
            }

            if (data[key].listtype_code == 'zinc_type') {
                this.zinc_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'machine') {
                this.machineList.push(data[key]);
            }

            if (data[key].listtype_code == 'size_store') {
                this.size_storeList.push(data[key]);
            }
            if (data[key].listtype_code == 'cut_type') {
                this.cut_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'number_char') {
                this.number_charList.push(data[key]);
            }
        });
    }

    apply() {
        this.result = this.message;
        this.close();
    }
}

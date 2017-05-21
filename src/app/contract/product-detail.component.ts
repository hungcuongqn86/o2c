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
    producttypeDetail: any = [];
    standardList: any = [];
    print_colorList: any = [];
    paper_typeList: any = [];
    outsourcingList: any = [];
    outsourceTypeSelected: Array<any> = [];

    res: any;

    constructor(dialogService: DialogService, private productService: productService) {
        super(dialogService);
    }

    ngOnInit() {
        this.detail.contract_id = this.contract_id;
        this.getProducttypes();
        this.getListData();
    }

    private getDetail(id: string) {
        this.productService.getSingle(id).subscribe(
            data => {
                this.detail = data;
                if (this.detail.outsource_type != '') {
                    this.outsourceTypeSelected = this.detail.outsource_type.split(',');
                }
                if (this.detail.outsource_type != '') {
                    this.selectProducttype();
                }
            },
            error => {
                console.error("Not product!");
                return Observable.throw(error);
            }
        );
    }

    private getProducttypes() {
        this.productService.getProducttypesData().subscribe(
            data => {
                this.producttype = data.data;
                if (this.id) {
                    this.getDetail(this.id.toString());
                }
            },
            error => {
                console.error("Not producttype!");
                return Observable.throw(error);
            }
        );
    }

    public selectProducttype() {
        for (let i = 0; i < this.producttype.length; i++) {
            const value = this.producttype[i].code;
            if (value == this.detail.producttype_code) {
                this.producttypeDetail = this.producttype[i];
                return false;
            }
        }
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
        });
    }

    checkedOutsourceItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.outsourceTypeSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.outsourceTypeSelected.indexOf(value);
            if (indexx >= 0) {
                this.outsourceTypeSelected.splice(indexx, 1);
            }
        }
    }

    apply() {
        if (this.outsourceTypeSelected.length > 0) {
            this.detail.outsource_type = this.outsourceTypeSelected.join(',');
        } else {
            this.detail.outsource_type = '';
        }
        this.productService.saveRecord(this.detail).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.close();
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
}

import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface ProductDetailModel {
    title: string;
    question: string;
}

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./contract.component.css']
})
export class ProductDetailComponent extends DialogComponent<ProductDetailModel, string> implements ProductDetailModel {
    title: string;
    question: string;
    message: string = '';

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    apply() {
        this.result = this.message;
        this.close();
    }
}

import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {cmdEl, productService} from  './product.service';
import {Observable} from 'rxjs/Rx';

export interface ProductCommandModel {
    idProd: number;
}

@Component({
    selector: 'product-command',
    templateUrl: './product-command.component.html',
    styleUrls: ['./contract.component.css']
})
export class ProductCommandComponent extends DialogComponent<ProductCommandModel, string> implements ProductCommandModel, OnInit {
    idProd: number;
    product: any = [];
    productType: any = [];
    elements: Array<any> = [];
    status = 'none';
    res: any;

    constructor(dialogService: DialogService, private productService: productService) {
        super(dialogService);
    }

    ngOnInit() {
        this.getDetail(this.idProd);
    }

    private getDetail(id) {
        this.productService.getSingle(id).subscribe(
            data => {
                this.product = data;
                if (this.product.elements != '') {
                    this.product.elements = JSON.parse(this.product.elements);
                }
                this.getProducttype();
            },
            error => {
                console.error("Not products!");
                return Observable.throw(error);
            }
        );
    }

    private getProducttype() {
        this.productService.getProducttype(this.product.producttype_code).subscribe(
            data => {
                this.productType = data;
                if (this.productType) {
                    this.genElement();
                }
            },
            error => {
                console.error("Not productType!");
                return Observable.throw(error);
            }
        );
    }

    private genElement() {
        const Els = this.productType.element_config;
        for (let i = 0; i < Els.length; i++) {
            const itemG: any = this._genElement(Els[i]);
            if (itemG) {
                this.elements.push(itemG);
            }
        }
    }

    private _genElement(el: any): any {
        console.log(this.product);
        let res: any;
        switch (el.id) {
            case 'bia':
                res = this._genBia(el);
                break;
            case 'ruot':
                res = this._genRuot(el);
                break;
            case 'to_gac':
                res = this._genTogac(el);
                break;
            case 'phu_ban':
                res = this._genPhuban(el);
                break;
            default:
                res = null;
                break;
        }
        return res;
    }

    private _genBia(el: any) {
        const res: cmdEl = new cmdEl();
        res.name = el.name;
        res.kho_tp = this.product.dai + 'x' + this.product.rong;
        return res;
    }

    private _genRuot(el: any) {
        const res: cmdEl = new cmdEl();
        res.name = el.name;
        res.so_trang = this.product.elements['ruot-in-so_trang'];
        res.kho_tp = this.product.dai + 'x' + this.product.rong;
        return res;
    }

    private _genTogac(el: any) {
        let res: cmdEl = new cmdEl();
        if (this.product.elements['to_gac-in-so_trang']) {
            res.name = el.name;
            res.so_trang = this.product.elements['to_gac-in-so_trang'];
            res.kho_tp = this.product.dai + 'x' + this.product.rong;
        } else {
            res = null;
        }
        return res;
    }

    private _genPhuban(el: any) {
        let res: cmdEl = new cmdEl();
        if (this.product.elements['phu_ban-in-so_trang']) {
            res.name = el.name;
            res.so_trang = this.product.elements['phu_ban-in-so_trang'];
            res.kho_tp = this.product.dai + 'x' + this.product.rong;
        } else {
            res = null;
        }
        return res;
    }
}

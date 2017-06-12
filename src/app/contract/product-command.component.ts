import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {cmdEl, productService} from  './product.service';
import {Observable} from 'rxjs/Rx';
import {Lib} from '../lib/lib';

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
    formData: any = JSON.parse('{"zinc_type":{"bia-sel-zinc_type":"CTP", "ruot-sel-zinc_type":"CTP", "to_gac-sel-zinc_type":"CTP", "phu_ban-sel-zinc_type":"CTP"}}');
    status = 'none';
    depreciation: any;
    res: any;

    constructor(private Lib: Lib, dialogService: DialogService, private productService: productService) {
        super(dialogService);
    }

    ngOnInit() {
        this.getDetail(this.idProd);
        this.getDepreciation();
    }

    private getDepreciation() {
        this.productService.getDepreciation().subscribe(
            data => {
                this.depreciation = data;
            },
            error => {
                console.error("Not Depreciation!");
                return Observable.throw(error);
            }
        );
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

    public genElement() {
        this.elements = [];
        const Els = this.productType.element_config;
        for (let i = 0; i < Els.length; i++) {
            const itemG: Array<any> = this._genElement(Els[i]);
            if (itemG && itemG.length) {
                for (let i = 0; i < itemG.length; i++) {
                    this.elements.push(itemG[i]);
                }
            }
        }
    }

    private _genElement(el: any): Array<any> {
        let res: Array<any> = [];
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

    private _genBia(el: any): Array<cmdEl> {
        const res: cmdEl = new cmdEl();
        res.id = el.id;
        res.name = el.name;
        res.kho_tp = this.product.dai + 'x' + this.product.rong;
        res.mau_in = this.product.elements['bia-sel-mau_in'];
        res.zinc_type = this.Lib.getFunctionData(el.properties, 'id', 'zinc_type');

        // Loai giay
        const sLoaiGiay = this.product.elements['bia-sel-loai_giay'];
        const arrAllLoaiGiay = this.Lib.getFunctionData(el.properties, 'id', 'loai_giay', 'data');
        const arrLoaiGiay = this.Lib.getFunctionData(arrAllLoaiGiay, 'list_code', sLoaiGiay);
        let dl = 0;
        let dg = 0;
        if (arrLoaiGiay) {
            res.loai_giay = arrLoaiGiay.detail.name;
            dl = arrLoaiGiay.detail.dl;
            dg = arrLoaiGiay.detail.dg;
        }

        // SL giay
        let arrKhoGiay = this.Lib.getFunctionData(el.properties, 'id', 'kho_giay', 'data');
        let sl: number;
        let detailKG: any;
        let so_to: number;

        // May in
        const arrMay = this.Lib.getFunctionData(el.properties, 'id', 'may_in', 'data');
        // Loai kem
        const zincType = this.formData.zinc_type['bia-sel-zinc_type'];
        // SL kem
        let zincCount = 0;
        for (let i = 0; i < arrKhoGiay.length; i++) {
            detailKG = arrKhoGiay[i].detail;
            if (this.product.dai >= this.product.rong * 2) {
                sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, this.product.dai, this.product.rong * 2, detailKG.kep_nhip);
            } else {
                sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, this.product.rong * 2, this.product.dai, detailKG.kep_nhip);
            }
            so_to = Math.ceil(this.product.count / sl);
            so_to = this.Lib.getPaperCount(so_to, this.depreciation);
            arrKhoGiay[i].gia_giay = so_to * detailKG.d * detailKG.r * dl * dg / 10000;
            zincCount = this.Lib.getZincCount(res.mau_in, 1, so_to);
            arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, zincCount, res.mau_in, detailKG, arrMay);
            arrKhoGiay[i].sl_kem = zincCount;
        }

        const fixKhoGiay = this.Lib.fixKhoGiay(arrKhoGiay);
        res.kho_in = fixKhoGiay.detail.name;
        res.may_in = fixKhoGiay.may_in.detail.name;
        res.sl_kem = fixKhoGiay.sl_kem;
        return [res];
    }

    private _genRuot(el: any): Array<cmdEl> {
        let res: Array<cmdEl> = [];
        const allR = this.product.elements['ruot-in-so_trang'];
        const arrDivisor = this.Lib.getDivisor(Number(allR));
        let arrKhoGiay = this.Lib.getFunctionData(el.properties, 'id', 'kho_giay', 'data');
        const zinc_type = this.Lib.getFunctionData(el.properties, 'id', 'zinc_type');
        // May in
        const arrMay = this.Lib.getFunctionData(el.properties, 'id', 'may_in', 'data');
        // Loai kem
        const zincType = this.formData.zinc_type['ruot-sel-zinc_type'];
        // Loai giay
        const sLoaiGiay = this.product.elements['ruot-sel-loai_giay'];
        const arrAllLoaiGiay = this.Lib.getFunctionData(el.properties, 'id', 'loai_giay', 'data');
        const arrLoaiGiay = this.Lib.getFunctionData(arrAllLoaiGiay, 'list_code', sLoaiGiay);
        let dl = 0;
        let dg = 0;
        if (arrLoaiGiay) {
            dl = arrLoaiGiay.detail.dl;
            dg = arrLoaiGiay.detail.dg;
        }
        let mau_in = this.product.elements['ruot-sel-mau_in'];
        let sl_kem = mau_in.split('/')[0];

        for (let i = 0; i < arrDivisor.length; i++) {
            const itemRes = new cmdEl();
            itemRes.id = el.id;
            itemRes.name = el.name;
            itemRes.so_trang = arrDivisor[i];
            itemRes.kho_tp = this.product.dai + 'x' + this.product.rong;
            itemRes.zinc_type = zinc_type;
            itemRes.loai_giay = arrLoaiGiay.detail.name;
            itemRes.mau_in = mau_in;
            itemRes.sl_kem = sl_kem;

            let sl: number;
            let detailKG: any;
            let so_to: number;
            for (let i = 0; i < arrKhoGiay.length; i++) {
                detailKG = arrKhoGiay[i].detail;
                if (this.product.dai >= this.product.rong * 2) {
                    sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, this.product.dai, this.product.rong * 2, detailKG.kep_nhip);
                } else {
                    sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, this.product.rong * 2, this.product.dai, detailKG.kep_nhip);
                }
                so_to = Math.ceil(this.product.count / sl);
                so_to = this.Lib.getPaperCount(so_to, this.depreciation);
                arrKhoGiay[i].gia_giay = so_to * detailKG.d * detailKG.r * dl * dg / 10000;
                // zincCount = this.Lib.getZincCount(res.mau_in, 1, so_to);
                arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, 1, itemRes.mau_in, detailKG, arrMay);
            }
            const fixKhoGiay = this.Lib.fixKhoGiay(arrKhoGiay);
            itemRes.kho_in = fixKhoGiay.detail.name;
            itemRes.may_in = fixKhoGiay.may_in.detail.name;
            res.push(itemRes);
        }
        return res;
    }

    private _genTogac(el: any): Array<cmdEl> {
        let res: cmdEl = new cmdEl();
        if (this.product.elements['to_gac-in-so_trang']) {
            res.id = el.id;
            res.name = el.name;
            res.so_trang = this.product.elements['to_gac-in-so_trang'];
            res.kho_tp = this.product.dai + 'x' + this.product.rong;
            res.zinc_type = el.properties.filter(function (itm) {
                return itm.id === 'zinc_type';
            })[0];
        } else {
            return null;
        }
        return [res];
    }

    private _genPhuban(el: any): Array<cmdEl> {
        let res: cmdEl = new cmdEl();
        if (this.product.elements['phu_ban-in-so_trang']) {
            res.id = el.id;
            res.name = el.name;
            res.so_trang = this.product.elements['phu_ban-in-so_trang'];
            res.kho_tp = this.product.dai + 'x' + this.product.rong;
            res.zinc_type = el.properties.filter(function (itm) {
                return itm.id === 'zinc_type';
            })[0];
        } else {
            return null;
        }
        return [res];
    }
}

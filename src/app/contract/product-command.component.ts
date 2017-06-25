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
    formData: any = JSON.parse('{"zinc_type":{"bia-sel-zinc_type":"CTP", "ruot-sel-zinc_type":"CTP", "to_gac-sel-zinc_type":"CTP", "phu_ban-sel-zinc_type":"CTP"}' +
        ',"kho_kho":{"bia-sel-kho_kho":"", "ruot-sel-kho_kho":"", "to_gac-sel-kho_kho":"", "phu_ban-sel-kho_kho":""}}');
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
        // Kho kho
        res.arrKho_kho = this.Lib.getFunctionData(el.properties, 'id', 'kho_kho');
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
        // May in
        const arrMay = this.Lib.getFunctionData(el.properties, 'id', 'may_in', 'data');
        // Loai kem
        const zincType = this.formData.zinc_type['bia-sel-zinc_type'];
        //
        res.cach_in = 'Trở nó';
        // SL giay
        let arrKhoGiay = this.Lib.getFunctionData(el.properties, 'id', 'kho_giay', 'data');
        if (this.product.dai >= this.product.rong * 2) {
            arrKhoGiay = this.Lib.getQualifiedSizeB(arrKhoGiay, this.product.dai, this.product.rong * 2);
        } else {
            arrKhoGiay = this.Lib.getQualifiedSizeB(arrKhoGiay, this.product.rong * 2, this.product.dai);
        }

        let so_luot_in = 0;
        let mat_in = this.Lib.getMatIn(res.mau_in);
        const allR = this.product.elements['ruot-in-so_trang'];
        const day_gay = (allR / 16) * (dl / 100);

        for (let i = 0; i < arrKhoGiay.length; i++) {
            let sl = 0;
            let detailKG = arrKhoGiay[i].detail;
            const rCV = (this.product.rong * 2) + day_gay;
            if (this.product.dai >= rCV) {
                sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, this.product.dai, rCV, detailKG.kep_nhip);
            } else {
                sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, rCV, this.product.dai, detailKG.kep_nhip);
            }
            let so_tay = Math.ceil(4 / (sl * 2));
            let soto1tay = Number(Math.ceil(this.product.count / 2));
            let buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
            let tongGiay1r = (soto1tay + buhao) * so_tay;
            arrKhoGiay[i].gia_giay = tongGiay1r * detailKG.d * detailKG.r * dl * dg / 10000;

            let zincCount = this.Lib.getZincCount(res.mau_in, 2, 1);
            so_luot_in = (this.product.count / sl) * mat_in;

            arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, zincCount, res.mau_in, detailKG, arrMay, so_luot_in);
            arrKhoGiay[i].sl_kem = zincCount;
            arrKhoGiay[i].so_tay = so_tay;
            arrKhoGiay[i].so_bat = sl * 2;
            arrKhoGiay[i].bu_hao = buhao;
            arrKhoGiay[i].so_luot_in = buhao;

            arrKhoGiay[i].tong_to_da_bu_hao = tongGiay1r;
            arrKhoGiay[i].sl_giay_xuat = tongGiay1r / 2;
            arrKhoGiay[i].tong_to_chua_bu_hao = soto1tay * so_tay;
        }

        const fixKhoGiay = this.Lib.fixKhoGiay(arrKhoGiay);
        res.kho_in = fixKhoGiay.detail.name;
        res.may_in = fixKhoGiay.may_in.detail.name;
        res.sl_kem = fixKhoGiay.sl_kem;
        res.so_tay = fixKhoGiay.so_tay;
        res.so_bat = fixKhoGiay.so_bat;
        res.bu_hao = fixKhoGiay.bu_hao;
        res.so_luot_in = fixKhoGiay.so_luot_in;
        res.tong_to_da_bu_hao = fixKhoGiay.tong_to_da_bu_hao;
        // res.sl_giay_xuat = fixKhoGiay.sl_giay_xuat;
        res.tong_to_chua_bu_hao = fixKhoGiay.tong_to_chua_bu_hao;
        return [res];
    }

    private _genRuot(el: any): Array<cmdEl> {
        let res: Array<cmdEl> = [];
        const allR = this.product.elements['ruot-in-so_trang'];
        let arrKhoGiay = this.Lib.getFunctionData(el.properties, 'id', 'kho_giay', 'data');
        const zinc_type = this.Lib.getFunctionData(el.properties, 'id', 'zinc_type');
        // Kho kho
        let arrKho_kho = this.Lib.getFunctionData(el.properties, 'id', 'kho_kho');
        const kho_kho = this.formData.kho_kho['ruot-sel-kho_kho'];
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
        let mat_in = this.Lib.getMatIn(mau_in);

        let soto1tay = 0;
        let sosp1tay = 1;
        let so_luot_in = 0;
        let tong_luot_in = 0;
        let buhao = 0;
        let tongGiay1r = 0;
        let zincCount = 0;
        let arrKhoGiay2 = this.Lib.getQualifiedSizeB(arrKhoGiay, this.product.dai, this.product.rong);
        for (let k = 0; k < arrKhoGiay2.length; k++) {
            let so_tay2 = 1;
            soto1tay = Number(Math.ceil(this.product.count / arrKhoGiay2[k].so_bat));
            sosp1tay = this.Lib.getNumberResize(arrKhoGiay2[k].detail.d, arrKhoGiay2[k].detail.r, this.product.dai, this.product.rong, arrKhoGiay2[k].detail.kep_nhip);
            arrKhoGiay2[k].so_luot_in = (this.product.count / sosp1tay) * mat_in;
            buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
            tongGiay1r = (soto1tay + buhao) * so_tay2;
            zincCount = this.Lib.getZincCount(mau_in, 2, 1);
            arrKhoGiay2[k].zincCount = zincCount;
            arrKhoGiay2[k].gia_giay = tongGiay1r * arrKhoGiay2[k].detail.d * arrKhoGiay2[k].detail.r * dl * dg / 10000;
            arrKhoGiay2[k].may_in = this.Lib.fixPrinter(zincType, zincCount, mau_in, arrKhoGiay2[k].detail, arrMay, arrKhoGiay2[k].so_luot_in);
            arrKhoGiay2[k].tong_to_chua_bu_hao = soto1tay * so_tay2;
            arrKhoGiay2[k].tong_to_da_bu_hao = tongGiay1r;
            arrKhoGiay2[k].bu_hao = buhao;
        }

        const fixKhoGiay2 = this.Lib.fixKhoGiay(arrKhoGiay2);
        arrKhoGiay = this.Lib.getQualifiedSize(arrKhoGiay, this.product.dai, this.product.rong, allR);
        // console.log(arrKhoGiay);

        for (let i = 0; i < arrKhoGiay.length; i++) {
            let so_tay = 0;
            let SumzincCount = 0;
            let tong_so_to = 0;
            let ts = arrKhoGiay[i].so_bat * 2;
            let arrDivisor: Array<any> = [];
            // console.log('----------------------------');
            tong_luot_in = 0;
            for (let j = 0; j < arrKhoGiay[i].divisor.length; j++) {
                let divisorItem: any = [];
                if (arrKhoGiay[i].divisor[j] > 2) {
                    if (j > 0) {
                        ts = ts / 2;
                        so_tay = Math.ceil(arrKhoGiay[i].divisor[j] / ts);
                        soto1tay = Number(Math.ceil(soto1tay / 2));
                        sosp1tay = sosp1tay * 2;
                        //luot in
                        so_luot_in = (this.product.count / sosp1tay) * mat_in * so_tay;
                        tong_luot_in = tong_luot_in + so_luot_in;
                        buhao = this.Lib.getBuhao(so_luot_in, dl, mau_in, this.depreciation);
                        tongGiay1r = (soto1tay + buhao) * so_tay;
                        tong_so_to = tong_so_to + tongGiay1r;
                        zincCount = this.Lib.getZincCount(mau_in, 2, so_tay);
                        SumzincCount = SumzincCount + zincCount;
                        divisorItem.so_bat = this.Lib.getNumberResize(Number(arrKhoGiay[i].detail.d), Number(arrKhoGiay[i].detail.r), Number(this.product.dai), Number(this.product.rong), Number(arrKhoGiay[i].detail.kep_nhip));
                        divisorItem.cach_in = 'Trở nó';
                    } else {
                        so_tay = Math.ceil(arrKhoGiay[i].divisor[j] / ts);
                        soto1tay = this.product.count;
                        sosp1tay = 1;
                        //luot in
                        so_luot_in = this.product.count * mat_in * so_tay;
                        tong_luot_in = tong_luot_in + so_luot_in;
                        buhao = this.Lib.getBuhao(so_luot_in, dl, mau_in, this.depreciation);
                        tongGiay1r = (soto1tay + buhao) * so_tay;
                        tong_so_to = tong_so_to + tongGiay1r;
                        zincCount = this.Lib.getZincCount(mau_in, 1, so_tay);
                        SumzincCount = SumzincCount + zincCount;
                        divisorItem.so_bat = this.Lib.getNumberResize(Number(arrKhoGiay[i].detail.d), Number(arrKhoGiay[i].detail.r), Number(this.product.dai), Number(this.product.rong), Number(arrKhoGiay[i].detail.kep_nhip));
                        divisorItem.cach_in = 'Trở khác';
                    }

                    divisorItem.zincCount = zincCount;
                    divisorItem.so_tay = so_tay;
                    divisorItem.tong_to_da_bu_hao = tongGiay1r;
                    divisorItem.tong_to_chua_bu_hao = soto1tay * so_tay;
                    divisorItem.bu_hao = buhao;
                    divisorItem.so_luot_in = so_luot_in;
                } else {
                    // Con 2 to roi
                    // console.log(111);
                    arrKhoGiay[i].fixKhoGiay2 = fixKhoGiay2;
                    divisorItem.zincCount = fixKhoGiay2.zincCount;
                    divisorItem.so_tay = 1;
                    divisorItem.so_bat = this.Lib.getNumberResize(Number(fixKhoGiay2.detail.d), Number(fixKhoGiay2.detail.r), Number(this.product.dai), Number(this.product.rong), Number(fixKhoGiay2.detail.kep_nhip));
                    divisorItem.cach_in = 'Trở nó';
                    divisorItem.tong_to_da_bu_hao = fixKhoGiay2.tong_to_da_bu_hao;
                    divisorItem.tong_to_chua_bu_hao = fixKhoGiay2.tong_to_chua_bu_hao;
                    divisorItem.bu_hao = fixKhoGiay2.bu_hao;
                    divisorItem.so_luot_in = fixKhoGiay2.so_luot_in;
                }
                divisorItem.so_trang = arrKhoGiay[i].divisor[j];
                arrDivisor.push(divisorItem);
            }
            //console.log(arrKhoGiay);
            if (arrKhoGiay[i].fixKhoGiay2 && arrKhoGiay[i].fixKhoGiay2.gia_giay) {
                arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000) + arrKhoGiay[i].fixKhoGiay2.gia_giay;
            } else {
                arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000);
            }
            arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, SumzincCount, mau_in, arrKhoGiay[i].detail, arrMay, tong_luot_in);
            arrKhoGiay[i]._divisor = arrDivisor;
        }

        const fixKhoGiay = this.Lib.fixKhoGiay(arrKhoGiay);
        let fixKhokho: any = [];
        arrKho_kho = this.Lib.getKhoKho(fixKhoGiay, arrKho_kho);
        if (!kho_kho) {
            fixKhokho = this.Lib.fixKhokho(fixKhoGiay, arrKho_kho);
        } else {
            fixKhokho = arrKho_kho.data.filter(function (itm) {
                return itm['list_code'] === kho_kho;
            })[0];
        }

        this.formData.kho_kho['ruot-sel-kho_kho'] = fixKhokho.detail.code;
        const cach_cat = this.Lib.getNumberResize(Number(fixKhokho.detail.d), Number(fixKhokho.detail.r), Number(fixKhoGiay.detail.d), Number(fixKhoGiay.detail.r), 0);
        const constKg = Number(dl) * Number(fixKhokho.detail.d) * Number(fixKhokho.detail.r) / 10000000;
        for (let i = 0; i < fixKhoGiay._divisor.length; i++) {
            const itemRes = new cmdEl();
            itemRes.id = el.id;
            itemRes.name = el.name;
            itemRes.so_trang = fixKhoGiay._divisor[i].so_trang;
            itemRes.kho_tp = this.product.dai + 'x' + this.product.rong;
            itemRes.zinc_type = zinc_type;
            itemRes.arrKho_kho = arrKho_kho;
            itemRes.loai_giay = arrLoaiGiay.detail.name;
            itemRes.mau_in = mau_in;
            itemRes.sl_kem = fixKhoGiay._divisor[i].zincCount;
            if (fixKhoGiay._divisor[i].so_trang > 2) {
                itemRes.kho_in = fixKhoGiay.detail.name;
                itemRes.may_in = fixKhoGiay.may_in.detail.name;
            } else {
                itemRes.kho_in = fixKhoGiay.fixKhoGiay2.detail.name;
                itemRes.may_in = fixKhoGiay.fixKhoGiay2.may_in.detail.name;
            }
            itemRes.so_tay = fixKhoGiay._divisor[i].so_tay;
            itemRes.so_bat = fixKhoGiay._divisor[i].so_bat;
            itemRes.cach_in = fixKhoGiay._divisor[i].cach_in;
            itemRes.tong_to_chua_bu_hao = fixKhoGiay._divisor[i].tong_to_chua_bu_hao;
            itemRes.tong_to_da_bu_hao = fixKhoGiay._divisor[i].tong_to_da_bu_hao;
            itemRes.bu_hao = fixKhoGiay._divisor[i].bu_hao;
            itemRes.so_luot_in = fixKhoGiay._divisor[i].so_luot_in;
            itemRes.cach_cat = cach_cat;
            itemRes.sl_giay_xuat = (Number(itemRes.tong_to_da_bu_hao) / itemRes.cach_cat).toFixed(2);
            itemRes.sl_giay_xuat_kg = (Number(itemRes.tong_to_da_bu_hao) * constKg).toFixed(2);
            res.push(itemRes);
        }
        return res;
    }

    private _genTogac(el: any): Array<cmdEl> {
        let res: Array<cmdEl> = [];
        if (this.product.elements['to_gac-in-so_trang']) {
            const allR = this.product.elements['ruot-in-so_trang'];
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
            let mat_in = this.Lib.getMatIn(mau_in);


            let soto1tay = 0;
            let sosp1tay = 1;
            let so_luot_in = 0;
            let tong_luot_in = 0;
            let buhao = 0;
            let tongGiay1r = 0;
            let zincCount = 0;
            let arrKhoGiay2 = this.Lib.getQualifiedSizeB(arrKhoGiay, this.product.dai, this.product.rong);
            for (let k = 0; k < arrKhoGiay2.length; k++) {
                let so_tay2 = 1;
                soto1tay = Number(Math.ceil(this.product.count / arrKhoGiay2[k].so_bat));
                sosp1tay = this.Lib.getNumberResize(arrKhoGiay2[k].detail.d, arrKhoGiay2[k].detail.r, this.product.dai, this.product.rong, arrKhoGiay2[k].detail.kep_nhip);
                arrKhoGiay2[k].so_luot_in = (this.product.count / sosp1tay) * mat_in;
                buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
                tongGiay1r = (soto1tay + buhao) * so_tay2;
                zincCount = this.Lib.getZincCount(mau_in, 2, 1);
                arrKhoGiay2[k].zincCount = zincCount;
                arrKhoGiay2[k].gia_giay = tongGiay1r * arrKhoGiay2[k].detail.d * arrKhoGiay2[k].detail.r * dl * dg / 10000;
                arrKhoGiay2[k].may_in = this.Lib.fixPrinter(zincType, zincCount, mau_in, arrKhoGiay2[k].detail, arrMay, arrKhoGiay2[k].so_luot_in);
                arrKhoGiay2[k].tong_to_chua_bu_hao = soto1tay * so_tay2;
                arrKhoGiay2[k].tong_to_da_bu_hao = tongGiay1r;
                arrKhoGiay2[k].bu_hao = buhao;
            }

            const fixKhoGiay2 = this.Lib.fixKhoGiay(arrKhoGiay2);
            arrKhoGiay = this.Lib.getQualifiedSize(arrKhoGiay, this.product.dai, this.product.rong, allR);

            // console.log(arrKhoGiay);

            for (let i = 0; i < arrKhoGiay.length; i++) {
                let so_tay = 0;
                let SumzincCount = 0;
                let tong_so_to = 0;
                let ts = arrKhoGiay[i].so_bat * 2;
                let arrDivisor: Array<any> = [];
                // console.log('----------------------------');
                tong_luot_in = 0;
                for (let j = 0; j < arrKhoGiay[i].divisor.length; j++) {
                    let divisorItem: any = [];
                    if (arrKhoGiay[i].divisor[j] > 2) {
                        if (j > 0) {
                            ts = ts / 2;
                            so_tay = arrKhoGiay[i].divisor[j] / ts;
                            soto1tay = Number(Math.ceil(soto1tay / 2));
                            sosp1tay = sosp1tay * 2;
                            //luot in
                            so_luot_in = (this.product.count / sosp1tay) * mat_in * so_tay;
                            tong_luot_in = tong_luot_in + so_luot_in;
                            buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
                            tongGiay1r = (soto1tay + buhao) * so_tay;
                            tong_so_to = tong_so_to + tongGiay1r;
                            zincCount = this.Lib.getZincCount(mau_in, 2, so_tay);
                            SumzincCount = SumzincCount + zincCount;
                            divisorItem.so_bat = this.Lib.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, this.product.dai, this.product.rong, arrKhoGiay[i].detail.kep_nhip);
                            divisorItem.cach_in = 'Trở nó';
                        } else {
                            so_tay = arrKhoGiay[i].divisor[j] / ts;
                            soto1tay = this.product.count;
                            sosp1tay = 1;
                            //luot in
                            so_luot_in = this.product.count * mat_in * so_tay;
                            tong_luot_in = tong_luot_in + so_luot_in;
                            buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
                            tongGiay1r = (soto1tay + buhao) * so_tay;
                            tong_so_to = tong_so_to + tongGiay1r;
                            zincCount = this.Lib.getZincCount(mau_in, 1, so_tay);
                            SumzincCount = SumzincCount + zincCount;
                            divisorItem.so_bat = this.Lib.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, this.product.dai, this.product.rong, arrKhoGiay[i].detail.kep_nhip);
                            divisorItem.cach_in = 'Trở khác';
                        }

                        divisorItem.zincCount = zincCount;
                        divisorItem.so_tay = so_tay;
                        divisorItem.tong_to_da_bu_hao = tongGiay1r;
                        divisorItem.sl_giay_xuat = tongGiay1r;
                        divisorItem.tong_to_chua_bu_hao = soto1tay * so_tay;
                        divisorItem.bu_hao = buhao;
                        divisorItem.so_luot_in = so_luot_in;
                    } else {
                        // Con 2 to roi
                        arrKhoGiay[i].fixKhoGiay2 = fixKhoGiay2;
                        divisorItem.zincCount = fixKhoGiay2.zincCount;
                        divisorItem.so_tay = 1;
                        divisorItem.so_bat = this.Lib.getNumberResize(fixKhoGiay2.detail.d, fixKhoGiay2.detail.r, this.product.dai, this.product.rong, fixKhoGiay2.detail.kep_nhip);
                        divisorItem.cach_in = 'Trở nó';
                        divisorItem.tong_to_da_bu_hao = fixKhoGiay2.tong_to_da_bu_hao;
                        divisorItem.sl_giay_xuat = Number(fixKhoGiay2.tong_to_da_bu_hao) / 2;
                        divisorItem.tong_to_chua_bu_hao = fixKhoGiay2.tong_to_chua_bu_hao;
                        divisorItem.bu_hao = fixKhoGiay2.bu_hao;
                        divisorItem.so_luot_in = fixKhoGiay2.so_luot_in;
                    }
                    divisorItem.so_trang = arrKhoGiay[i].divisor[j];
                    arrDivisor.push(divisorItem);
                }
                /*if (arrKhoGiay[i].fixKhoGiay2 && arrKhoGiay[i].fixKhoGiay2.gia_giay) {
                 arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000) + arrKhoGiay[i].fixKhoGiay2.gia_giay;
                 }else{
                 arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000);
                 }*/
                arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000);
                // console.log(arrKhoGiay[i], tong_luot_in);
                arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, SumzincCount, mau_in, arrKhoGiay[i].detail, arrMay, tong_luot_in);
                arrKhoGiay[i]._divisor = arrDivisor;
            }

            const fixKhoGiay = this.Lib.fixKhoGiay(arrKhoGiay);
            // console.log(fixKhoGiay);
            for (let i = 0; i < fixKhoGiay._divisor.length; i++) {
                const itemRes = new cmdEl();
                itemRes.id = el.id;
                itemRes.name = el.name;
                itemRes.so_trang = fixKhoGiay._divisor[i].so_trang;
                itemRes.kho_tp = this.product.dai + 'x' + this.product.rong;
                itemRes.zinc_type = zinc_type;
                itemRes.loai_giay = arrLoaiGiay.detail.name;
                itemRes.mau_in = mau_in;
                itemRes.sl_kem = fixKhoGiay._divisor[i].zincCount;
                if (fixKhoGiay._divisor[i].so_trang > 2) {
                    itemRes.kho_in = fixKhoGiay.detail.name;
                    itemRes.may_in = fixKhoGiay.may_in.detail.name;
                } else {
                    itemRes.kho_in = fixKhoGiay.fixKhoGiay2.detail.name;
                    itemRes.may_in = fixKhoGiay.fixKhoGiay2.may_in.detail.name;
                }
                itemRes.so_tay = fixKhoGiay._divisor[i].so_tay;
                itemRes.so_bat = fixKhoGiay._divisor[i].so_bat;
                itemRes.cach_in = fixKhoGiay._divisor[i].cach_in;
                // itemRes.sl_giay_xuat = fixKhoGiay._divisor[i].sl_giay_xuat;
                itemRes.tong_to_chua_bu_hao = fixKhoGiay._divisor[i].tong_to_chua_bu_hao;
                itemRes.tong_to_da_bu_hao = fixKhoGiay._divisor[i].tong_to_da_bu_hao;
                itemRes.bu_hao = fixKhoGiay._divisor[i].bu_hao;
                itemRes.so_luot_in = fixKhoGiay._divisor[i].so_luot_in;
                res.push(itemRes);
            }
        } else {
            return null;
        }
        return res;
    }

    private _genPhuban(el: any): Array<cmdEl> {
        let res: Array<cmdEl> = [];
        if (this.product.elements['to_gac-in-so_trang']) {
            const allR = this.product.elements['ruot-in-so_trang'];
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
            let mat_in = this.Lib.getMatIn(mau_in);


            let soto1tay = 0;
            let sosp1tay = 1;
            let so_luot_in = 0;
            let tong_luot_in = 0;
            let buhao = 0;
            let tongGiay1r = 0;
            let zincCount = 0;
            let arrKhoGiay2 = this.Lib.getQualifiedSizeB(arrKhoGiay, this.product.dai, this.product.rong);
            for (let k = 0; k < arrKhoGiay2.length; k++) {
                let so_tay2 = 1;
                soto1tay = Number(Math.ceil(this.product.count / arrKhoGiay2[k].so_bat));
                sosp1tay = this.Lib.getNumberResize(arrKhoGiay2[k].detail.d, arrKhoGiay2[k].detail.r, this.product.dai, this.product.rong, arrKhoGiay2[k].detail.kep_nhip);
                arrKhoGiay2[k].so_luot_in = (this.product.count / sosp1tay) * mat_in;
                buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
                tongGiay1r = (soto1tay + buhao) * so_tay2;
                zincCount = this.Lib.getZincCount(mau_in, 2, 1);
                arrKhoGiay2[k].zincCount = zincCount;
                arrKhoGiay2[k].gia_giay = tongGiay1r * arrKhoGiay2[k].detail.d * arrKhoGiay2[k].detail.r * dl * dg / 10000;
                arrKhoGiay2[k].may_in = this.Lib.fixPrinter(zincType, zincCount, mau_in, arrKhoGiay2[k].detail, arrMay, arrKhoGiay2[k].so_luot_in);
                arrKhoGiay2[k].tong_to_chua_bu_hao = soto1tay * so_tay2;
                arrKhoGiay2[k].tong_to_da_bu_hao = tongGiay1r;
                arrKhoGiay2[k].bu_hao = buhao;
            }

            const fixKhoGiay2 = this.Lib.fixKhoGiay(arrKhoGiay2);
            arrKhoGiay = this.Lib.getQualifiedSize(arrKhoGiay, this.product.dai, this.product.rong, allR);

            // console.log(arrKhoGiay);

            for (let i = 0; i < arrKhoGiay.length; i++) {
                let so_tay = 0;
                let SumzincCount = 0;
                let tong_so_to = 0;
                let ts = arrKhoGiay[i].so_bat * 2;
                let arrDivisor: Array<any> = [];
                // console.log('----------------------------');
                tong_luot_in = 0;
                for (let j = 0; j < arrKhoGiay[i].divisor.length; j++) {
                    let divisorItem: any = [];
                    if (arrKhoGiay[i].divisor[j] > 2) {
                        if (j > 0) {
                            ts = ts / 2;
                            so_tay = arrKhoGiay[i].divisor[j] / ts;
                            soto1tay = Number(Math.ceil(soto1tay / 2));
                            sosp1tay = sosp1tay * 2;
                            //luot in
                            so_luot_in = (this.product.count / sosp1tay) * mat_in * so_tay;
                            tong_luot_in = tong_luot_in + so_luot_in;
                            buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
                            tongGiay1r = (soto1tay + buhao) * so_tay;
                            tong_so_to = tong_so_to + tongGiay1r;
                            zincCount = this.Lib.getZincCount(mau_in, 2, so_tay);
                            SumzincCount = SumzincCount + zincCount;
                            divisorItem.so_bat = this.Lib.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, this.product.dai, this.product.rong, arrKhoGiay[i].detail.kep_nhip);
                            divisorItem.cach_in = 'Trở nó';
                        } else {
                            so_tay = arrKhoGiay[i].divisor[j] / ts;
                            soto1tay = this.product.count;
                            sosp1tay = 1;
                            //luot in
                            so_luot_in = this.product.count * mat_in * so_tay;
                            tong_luot_in = tong_luot_in + so_luot_in;
                            buhao = this.Lib.getPaperCount(soto1tay, this.depreciation);
                            tongGiay1r = (soto1tay + buhao) * so_tay;
                            tong_so_to = tong_so_to + tongGiay1r;
                            zincCount = this.Lib.getZincCount(mau_in, 1, so_tay);
                            SumzincCount = SumzincCount + zincCount;
                            divisorItem.so_bat = this.Lib.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, this.product.dai, this.product.rong, arrKhoGiay[i].detail.kep_nhip);
                            divisorItem.cach_in = 'Trở khác';
                        }

                        divisorItem.zincCount = zincCount;
                        divisorItem.so_tay = so_tay;
                        divisorItem.tong_to_da_bu_hao = tongGiay1r;
                        divisorItem.sl_giay_xuat = tongGiay1r;
                        divisorItem.tong_to_chua_bu_hao = soto1tay * so_tay;
                        divisorItem.bu_hao = buhao;
                        divisorItem.so_luot_in = so_luot_in;
                    } else {
                        // Con 2 to roi
                        arrKhoGiay[i].fixKhoGiay2 = fixKhoGiay2;
                        divisorItem.zincCount = fixKhoGiay2.zincCount;
                        divisorItem.so_tay = 1;
                        divisorItem.so_bat = this.Lib.getNumberResize(fixKhoGiay2.detail.d, fixKhoGiay2.detail.r, this.product.dai, this.product.rong, fixKhoGiay2.detail.kep_nhip);
                        divisorItem.cach_in = 'Trở nó';
                        divisorItem.tong_to_da_bu_hao = fixKhoGiay2.tong_to_da_bu_hao;
                        divisorItem.sl_giay_xuat = Number(fixKhoGiay2.tong_to_da_bu_hao) / 2;
                        divisorItem.tong_to_chua_bu_hao = fixKhoGiay2.tong_to_chua_bu_hao;
                        divisorItem.bu_hao = fixKhoGiay2.bu_hao;
                        divisorItem.so_luot_in = fixKhoGiay2.so_luot_in;
                    }
                    divisorItem.so_trang = arrKhoGiay[i].divisor[j];
                    arrDivisor.push(divisorItem);
                }
                /*if (arrKhoGiay[i].fixKhoGiay2 && arrKhoGiay[i].fixKhoGiay2.gia_giay) {
                 arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000) + arrKhoGiay[i].fixKhoGiay2.gia_giay;
                 }else{
                 arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000);
                 }*/
                arrKhoGiay[i].gia_giay = (tong_so_to * arrKhoGiay[i].detail.d * arrKhoGiay[i].detail.r * dl * dg / 10000);
                // console.log(arrKhoGiay[i], tong_luot_in);
                arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, SumzincCount, mau_in, arrKhoGiay[i].detail, arrMay, tong_luot_in);
                arrKhoGiay[i]._divisor = arrDivisor;
            }

            const fixKhoGiay = this.Lib.fixKhoGiay(arrKhoGiay);
            // console.log(fixKhoGiay);
            for (let i = 0; i < fixKhoGiay._divisor.length; i++) {
                const itemRes = new cmdEl();
                itemRes.id = el.id;
                itemRes.name = el.name;
                itemRes.so_trang = fixKhoGiay._divisor[i].so_trang;
                itemRes.kho_tp = this.product.dai + 'x' + this.product.rong;
                itemRes.zinc_type = zinc_type;
                itemRes.loai_giay = arrLoaiGiay.detail.name;
                itemRes.mau_in = mau_in;
                itemRes.sl_kem = fixKhoGiay._divisor[i].zincCount;
                if (fixKhoGiay._divisor[i].so_trang > 2) {
                    itemRes.kho_in = fixKhoGiay.detail.name;
                    itemRes.may_in = fixKhoGiay.may_in.detail.name;
                } else {
                    itemRes.kho_in = fixKhoGiay.fixKhoGiay2.detail.name;
                    itemRes.may_in = fixKhoGiay.fixKhoGiay2.may_in.detail.name;
                }
                itemRes.so_tay = fixKhoGiay._divisor[i].so_tay;
                itemRes.so_bat = fixKhoGiay._divisor[i].so_bat;
                itemRes.cach_in = fixKhoGiay._divisor[i].cach_in;
                // itemRes.sl_giay_xuat = fixKhoGiay._divisor[i].sl_giay_xuat;
                itemRes.tong_to_chua_bu_hao = fixKhoGiay._divisor[i].tong_to_chua_bu_hao;
                itemRes.tong_to_da_bu_hao = fixKhoGiay._divisor[i].tong_to_da_bu_hao;
                itemRes.bu_hao = fixKhoGiay._divisor[i].bu_hao;
                itemRes.so_luot_in = fixKhoGiay._divisor[i].so_luot_in;
                res.push(itemRes);
            }
        } else {
            return null;
        }
        return res;
    }
}

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
    depreciationR: any;
    depreciationC: any;
    depreciationB: any;
    constTime: any;
    arrTime: Array<any> = [];
    cachGiaCong: Array<string> = [];
    cachGiaCongData: any;
    res: any;

    constructor(private Lib: Lib, dialogService: DialogService, private productService: productService) {
        super(dialogService);
        this.arrTime['tkcb'] = 0;
        this.arrTime['cat_giay_trang'] = 0;
        this.arrTime['mayin_tkcb'] = 0;
        this.arrTime['gia_cong_sau_in'] = 0;
    }

    ngOnInit() {
        this.getDetail(this.idProd);
        this.getDepreciationR();
        this.getDepreciationC();
        this.getDepreciationB();
        this.getConstTime();
    }

    private getConstTime() {
        this.productService.getConstTime().subscribe(
            data => {
                this.constTime = data;
            },
            error => {
                console.error("Not Depreciation!");
                return Observable.throw(error);
            }
        );
    }

    private getDepreciationB() {
        this.productService.getDepreciationB().subscribe(
            data => {
                this.depreciationB = data;
            },
            error => {
                console.error("Not Depreciation!");
                return Observable.throw(error);
            }
        );
    }

    private getDepreciationR() {
        this.productService.getDepreciationR().subscribe(
            data => {
                this.depreciationR = data;
            },
            error => {
                console.error("Not Depreciation!");
                return Observable.throw(error);
            }
        );
    }

    private getDepreciationC() {
        this.productService.getDepreciationC().subscribe(
            data => {
                this.depreciationC = data;
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
                    this.cachGiaCongData = this.getCachGiaCongData();
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
        let so_tay = 0;
        for (let i = 0; i < Els.length; i++) {
            const itemG: Array<any> = this._genElement(Els[i]);
            if (itemG && itemG.length) {
                for (let i = 0; i < itemG.length; i++) {
                    so_tay = so_tay + itemG[i].so_tay;
                    this.elements.push(itemG[i]);
                    this.genTongGioThucHien(itemG[i].arrTime);
                }
            }
        }
        this.genCachGiaCong();
    }

    private genTongGioThucHien(arrTime) {
        this.arrTime['tkcb'] = Number(this.arrTime['tkcb']) + Number(arrTime['tkcb']);
        this.arrTime['cat_giay_trang'] = Number(this.arrTime['cat_giay_trang']) + Number(arrTime['cat_giay_trang']);
        this.arrTime['mayin_tkcb'] = Number(this.arrTime['mayin_tkcb']) + Number(arrTime['mayin_tkcb']);
        this.arrTime['gia_cong_sau_in'] = Number(this.arrTime['gia_cong_sau_in']) + Number(arrTime['gia_cong_sau_in']);
    }

    private genCachGiaCong() {
        const data: string = this.product.elements.checkSelected.split(',');
        const substring = 'bia-mchk-cach_gia_cong';
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes(substring)) {
                const arrItem = data[i].split('-val-');
                this.cachGiaCong.push(this.getCachGiaCong(arrItem[1]));
            }
        }
    }

    private getCachGiaCong(code) {
        const objList = this.cachGiaCongData.filter(function (itm) {
            return itm['list_code'] === code;
        })[0];
        if (objList) {
            return objList.detail.name;
        }
        return '';
    }

    private getCachGiaCongData() {
        const list = this.productType.element_config;
        const objList = list.filter(function (itm) {
            return itm['id'] === 'bia';
        })[0].properties;
        if (objList) {
            const arrData = objList.filter(function (itm) {
                return itm['id'] === 'cach_gia_cong';
            })[0].data;
            if (arrData) {
                return arrData;
            }
        }
        return [];
    }

    private genTimeB(so_to) {
        let res: any = [];
        Object.keys(this.constTime).map((index) => {
            const cfg = this.constTime[index];
            const arrcfg = cfg.split(',');
            res[index] = (so_to / 8 / Number(arrcfg[2])).toFixed(2);
        });
        return res;
    }

    private genTimeR(so_to) {
        let res: any = [];
        Object.keys(this.constTime).map((index) => {
            const cfg = this.constTime[index];
            const arrcfg = cfg.split(',');
            res[index] = (so_to / Number(arrcfg[0])).toFixed(2);
        });
        return res;
    }

    private genTimeC(so_to, so_tay) {
        let res: any = [];
        Object.keys(this.constTime).map((index) => {
            const cfg = this.constTime[index];
            const arrcfg = cfg.split(',');
            res[index] = ((so_tay * so_to) / (2 * Number(arrcfg[1]))).toFixed(2);
        });
        return res;
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
        let arrKho_kho = this.Lib.getFunctionData(el.properties, 'id', 'kho_kho');
        const kho_kho = this.formData.kho_kho['bia-sel-kho_kho'];
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
        const allR = this.product.elements['ruot-in-so_trang'];
        const day_gay = (allR / 16) * (dl / 100);
        const rCV = (this.product.rong * 2) + day_gay;
        if (this.product.dai >= rCV) {
            arrKhoGiay = this.Lib.getQualifiedSizeB(arrKhoGiay, this.product.dai, rCV);
        } else {
            arrKhoGiay = this.Lib.getQualifiedSizeB(arrKhoGiay, rCV, this.product.dai);
        }

        let so_luot_in = 0;
        let mat_in = this.Lib.getMatIn(res.mau_in);
        for (let i = 0; i < arrKhoGiay.length; i++) {
            let sl = 0;
            let detailKG = arrKhoGiay[i].detail;
            if (this.product.dai >= rCV) {
                sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, this.product.dai, rCV, detailKG.kep_nhip);
            } else {
                sl = this.Lib.getNumberResize(detailKG.d, detailKG.r, rCV, this.product.dai, detailKG.kep_nhip);
            }
            let so_tay = Math.ceil(4 / (sl * 2));
            let soto1tay = Number(Math.ceil(this.product.count / 2));
            so_luot_in = (this.product.count / sl) * mat_in;
            let buhao = this.Lib.getBuhaoBia(so_luot_in, res.mau_in, this.depreciationB);
            let tongGiay1r = (soto1tay + buhao) * so_tay;
            arrKhoGiay[i].gia_giay = tongGiay1r * detailKG.d * detailKG.r * dl * dg / 10000;
            let zincCount = this.Lib.getZincCountR(res.mau_in, 2, 1);
            arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, zincCount, res.mau_in, detailKG, arrMay, so_luot_in);
            arrKhoGiay[i].sl_kem = zincCount;
            arrKhoGiay[i].so_tay = so_tay;
            arrKhoGiay[i].so_bat = sl * 2;
            arrKhoGiay[i].bu_hao = buhao;
            arrKhoGiay[i].so_luot_in = so_luot_in;
            arrKhoGiay[i].tong_to_da_bu_hao = tongGiay1r;
            arrKhoGiay[i].sl_giay_xuat = tongGiay1r / 2;
            arrKhoGiay[i].tong_to_chua_bu_hao = soto1tay * so_tay;
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

        this.formData.kho_kho['bia-sel-kho_kho'] = fixKhokho.detail.code;
        const cach_cat = this.Lib.getNumberResize(Number(fixKhokho.detail.d), Number(fixKhokho.detail.r), Number(fixKhoGiay.detail.d), Number(fixKhoGiay.detail.r), 0);
        const constKg = Number(dl) * Number(fixKhokho.detail.d) * Number(fixKhokho.detail.r) / 10000000;
        res.cach_cat = cach_cat;
        res.sl_giay_xuat = Number(fixKhoGiay.tong_to_da_bu_hao) / res.cach_cat;
        res.sl_giay_xuat_kg = (Number(fixKhoGiay.tong_to_da_bu_hao) * constKg).toFixed(2);
        res.arrKho_kho = arrKho_kho;
        res.kho_in = fixKhoGiay.detail.name;
        res.may_in = fixKhoGiay.may_in.detail.name;
        res.sl_kem = fixKhoGiay.sl_kem;
        res.so_tay = fixKhoGiay.so_tay;
        res.so_bat = fixKhoGiay.so_bat;
        res.bu_hao = fixKhoGiay.bu_hao;
        res.so_luot_in = fixKhoGiay.so_luot_in;
        res.tong_to_da_bu_hao = fixKhoGiay.tong_to_da_bu_hao;
        res.tong_to_chua_bu_hao = fixKhoGiay.tong_to_chua_bu_hao;
        res.arrTime = this.genTimeB(res.tong_to_da_bu_hao);
        return [res];
    }

    private _genRuot(el: any): Array<cmdEl> {
        let res: Array<cmdEl> = [];
        const in_cuon = this.product.elements['ruot-chk-cach_in'];
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
            sosp1tay = this.Lib.getNumberResize(arrKhoGiay2[k].detail.d, arrKhoGiay2[k].detail.r, this.product.dai, this.product.rong, arrKhoGiay2[k].detail.kep_nhip);
            arrKhoGiay2[k].so_luot_in = (this.product.count / sosp1tay) * mat_in;
            buhao = this.Lib.getBuhao(arrKhoGiay2[k].so_luot_in, dl, mau_in, this.depreciationR, this.depreciationC, false);
            tongGiay1r = (soto1tay + buhao) * so_tay2;
            zincCount = this.Lib.getZincCountR(mau_in, 2, 1);
            arrKhoGiay2[k].zincCount = zincCount;
            arrKhoGiay2[k].gia_giay = tongGiay1r * arrKhoGiay2[k].detail.d * arrKhoGiay2[k].detail.r * dl * dg / 10000;
            arrKhoGiay2[k].may_in = this.Lib.fixPrinter(zincType, zincCount, mau_in, arrKhoGiay2[k].detail, arrMay, arrKhoGiay2[k].so_luot_in, false);
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
                        buhao = this.Lib.getBuhao(so_luot_in, dl, mau_in, this.depreciationR, this.depreciationC, in_cuon);
                        tongGiay1r = (soto1tay + buhao) * so_tay;
                        tong_so_to = tong_so_to + tongGiay1r;
                        if (in_cuon) {
                            zincCount = this.Lib.getZincCountC(mau_in, arrKhoGiay[i].divisor[j]);
                        } else {
                            zincCount = this.Lib.getZincCountR(mau_in, 2, so_tay);
                        }
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
                        buhao = this.Lib.getBuhao(so_luot_in, dl, mau_in, this.depreciationR, this.depreciationC, in_cuon);
                        tongGiay1r = (soto1tay + buhao) * so_tay;
                        tong_so_to = tong_so_to + tongGiay1r;
                        if (in_cuon) {
                            zincCount = this.Lib.getZincCountC(mau_in, arrKhoGiay[i].divisor[j]);
                        } else {
                            zincCount = this.Lib.getZincCountR(mau_in, 1, so_tay);
                        }
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
            arrKhoGiay[i].may_in = this.Lib.fixPrinter(zincType, SumzincCount, mau_in, arrKhoGiay[i].detail, arrMay, tong_luot_in, in_cuon);
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
            itemRes.sl_giay_xuat = Number(itemRes.tong_to_da_bu_hao) / itemRes.cach_cat;
            itemRes.sl_giay_xuat_kg = (Number(itemRes.tong_to_da_bu_hao) * constKg).toFixed(2);
            if (in_cuon) {
                itemRes.arrTime = this.genTimeC(itemRes.tong_to_da_bu_hao, itemRes.so_tay);
            } else {
                itemRes.arrTime = this.genTimeR(itemRes.tong_to_da_bu_hao);
            }
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
        } else {
            return null;
        }
        return res;
    }
}

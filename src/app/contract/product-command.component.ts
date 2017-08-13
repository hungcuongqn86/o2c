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
    formData: any = JSON.parse('{"numofthung": 1, "thung":"25x27x35","zinc_type":{"bia-sel-zinc_type":"CTP", "ruot-sel-zinc_type":"CTP", "to_gac-sel-zinc_type":"CTP", "phu_ban-sel-zinc_type":"CTP"}' +
        ',"kho_kho":{"bia-sel-kho_kho":"", "ruot-sel-kho_kho":"", "to_gac-sel-kho_kho":"", "phu_ban-sel-kho_kho":""}}');
    status = 'none';
    depreciationR: any;
    depreciationC: any;
    depreciationB: any;
    constTime: any;
    arrTime: Array<any> = [];
    cachGiaCong: Array<string> = [];
    cachGiaCongData: any;
    thungData: any;
    numthung = 1;
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
        this.getThungData();
    }

    private getThungData() {
        this.productService.getThungData().subscribe(
            data => {
                this.thungData = data;
            },
            error => {
                console.error("Not ThungData!");
                return Observable.throw(error);
            }
        );
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
                this.getThung();
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
        this.arrTime['tkcb'] = (Number(this.arrTime['tkcb']) + Number(arrTime['tkcb'])).toFixed(2);
        this.arrTime['cat_giay_trang'] = (Number(this.arrTime['cat_giay_trang']) + Number(arrTime['cat_giay_trang'])).toFixed(2);
        this.arrTime['mayin_tkcb'] = (Number(this.arrTime['mayin_tkcb']) + Number(arrTime['mayin_tkcb'])).toFixed(2);
        this.arrTime['gia_cong_sau_in'] = (Number(this.arrTime['gia_cong_sau_in']) + Number(arrTime['gia_cong_sau_in'])).toFixed(2);
    }

    private genCachGiaCong() {
        if (this.product.elements.checkSelected) {
            const data = this.product.elements.checkSelected.split(',');
            const substring = 'bia-mchk-cach_gia_cong';
            for (let i = 0; i < data.length; i++) {
                if (data[i].includes(substring)) {
                    const arrItem = data[i].split('-val-');
                    this.cachGiaCong.push(this.getCachGiaCong(arrItem[1]));
                }
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

    private getThung() {
        this.numthung = Math.ceil(Number(this.product.count) / this.formData.numofthung);
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
        res.kho_tp = this.product.rong + 'x' + this.product.dai;
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
        const day_gay = (allR / 16) * (dl / 1000);
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
        arrKho_kho = this.Lib.getKhoKho(fixKhoGiay.detail, arrKho_kho);
        if (!kho_kho) {
            fixKhokho = this.Lib.fixKhokho(fixKhoGiay.detail, arrKho_kho);
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
        res.kho_kho = fixKhokho;
        res.kho_in = fixKhoGiay.detail.name;
        res.may_in = fixKhoGiay.may_in.detail.name;
        res.sl_kem = fixKhoGiay.sl_kem;
        res.so_tay = fixKhoGiay.so_tay;
        res.so_bat = fixKhoGiay.so_bat;
        res.so_vach = this.Lib.getSoVach(Number(res.so_bat) * 2);
        res.bu_hao = fixKhoGiay.bu_hao;
        res.so_luot_in = fixKhoGiay.so_luot_in;
        res.tong_to_da_bu_hao = fixKhoGiay.tong_to_da_bu_hao;
        res.tong_to_chua_bu_hao = fixKhoGiay.tong_to_chua_bu_hao;
        res.arrTime = this.genTimeB(res.tong_to_da_bu_hao);
        return [res];
    }

    private _genRuot(el: any): Array<cmdEl> {
        let res: Array<cmdEl> = [];
        const tong_so_trang = Number(this.product.elements['ruot-in-so_trang']);
        const in_cuon = this.product.elements['ruot-chk-cach_in'];
        // Loai kem
        const zinc_type = this.Lib.getFunctionData(el.properties, 'id', 'zinc_type');
        const zincType = this.formData.zinc_type['ruot-sel-zinc_type'];
        // Kho kho
        let arrKho_kho = this.Lib.getFunctionData(el.properties, 'id', 'kho_kho');
        const kho_kho = this.formData.kho_kho['ruot-sel-kho_kho'];
        // May in
        const arrMay = this.Lib.getFunctionData(el.properties, 'id', 'may_in', 'data');
        // Kho giay
        let arrKhoGiay = this.Lib.getFunctionData(el.properties, 'id', 'kho_giay', 'data');
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
        const mau_in = this.product.elements['ruot-sel-mau_in'];
        const GiaCongGay = this.product.elements['gay-sel-cach_gia_cong'];
        let divisor = this.Lib.genDivisor(tong_so_trang, this.product, arrKhoGiay, GiaCongGay, in_cuon, dl);
        const divisorfix = {
            init: false,
            cost: 0,
            divisor: []
        };
        if (divisor) {
            divisor = this.Lib.convertDivisor(tong_so_trang, divisor);
            let gia_giay = 0, tong_so_to = 0, so_luot_in = 0, soto1tay = 0, sosp1tay = 0, buhao = 0;
            let mat_in = this.Lib.getMatIn(mau_in);
            let may_in: any;
            let zincCount = 0;
            let printConst = 1;
            let cost = 0;
            for (let i = 0; i < divisor.length; i++) {
                cost = 0;
                for (let j = 0; j < divisor[i].length; j++) {
                    //chi phi giay
                    sosp1tay = Math.ceil(divisor[i][j].so_bat * 2 / divisor[i][j].so_trang);
                    soto1tay = Math.ceil(this.product.count / sosp1tay);
                    divisor[i][j]['so_luot_in'] = soto1tay * mat_in * divisor[i][j].so_tay;
                    divisor[i][j]['bu_hao'] = this.Lib.getBuhao(divisor[i][j]['so_luot_in'], dl, mau_in, this.depreciationR, this.depreciationC, divisor[i][j].in_cuon);
                    tong_so_to = (soto1tay + divisor[i][j]['bu_hao']) * divisor[i][j].so_tay;
                    gia_giay = tong_so_to * divisor[i][j].kho_giay.d * divisor[i][j].kho_giay.r * dl * dg / 10000;

                    //may in, chi phi kem
                    if (divisor[i][j].in_cuon) {
                        zincCount = this.Lib.getZincCountC(mau_in, divisor[i][j].so_trang);
                        divisor[i][j]['cach_in'] = 'Trở khác';
                    } else {
                        if (divisor[i][j].tro_khac) {
                            printConst = 1;
                            divisor[i][j]['cach_in'] = 'Trở khác';
                        } else {
                            printConst = 2;
                            divisor[i][j]['cach_in'] = 'Trở nó';
                        }
                        zincCount = this.Lib.getZincCountR(mau_in, printConst, divisor[i][j].so_tay);
                    }
                    may_in = this.Lib.fixPrinter(zincType, zincCount, mau_in, divisor[i][j].kho_giay, arrMay, divisor[i][j]['so_luot_in'], divisor[i][j].in_cuon);
                    cost = cost + gia_giay + may_in.gia_kem + may_in.cong_in;
                    divisor[i][j]['zincCount'] = zincCount;
                    divisor[i][j]['may_in'] = may_in;
                    divisor[i][j]['tong_to_chua_bu_hao'] = soto1tay * divisor[i][j].so_tay;
                    divisor[i][j]['tong_to_da_bu_hao'] = (soto1tay + divisor[i][j]['bu_hao']) * divisor[i][j].so_tay;
                }
                if (!divisorfix.init) {
                    divisorfix.init = true;
                    divisorfix.cost = cost;
                    divisorfix.divisor = divisor[i];
                } else {
                    if (cost < divisorfix.cost) {
                        divisorfix.cost = cost;
                        divisorfix.divisor = divisor[i];
                    }
                }
            }
        }

        let constKg = 0;
        for (let i = 0; i < divisorfix.divisor.length; i++) {
            const itemRes = new cmdEl();
            itemRes.id = el.id;
            itemRes.name = el.name;
            itemRes.so_trang = divisorfix.divisor[i].so_trang;
            itemRes.kho_tp = this.product.rong + 'x' + this.product.dai;
            itemRes.zinc_type = zinc_type;
            itemRes.loai_giay = arrLoaiGiay.detail.name;
            itemRes.mau_in = mau_in;
            itemRes.sl_kem = divisorfix.divisor[i].zincCount;
            itemRes.kho_in = divisorfix.divisor[i].kho_giay.name;
            itemRes.may_in = divisorfix.divisor[i].may_in.detail.name;
            itemRes.so_tay = divisorfix.divisor[i].so_tay;
            itemRes.so_bat = divisorfix.divisor[i].so_bat;
            itemRes.cach_in = divisorfix.divisor[i].cach_in;
            itemRes.tong_to_chua_bu_hao = divisorfix.divisor[i].tong_to_chua_bu_hao;
            itemRes.tong_to_da_bu_hao = divisorfix.divisor[i].tong_to_da_bu_hao;
            itemRes.bu_hao = divisorfix.divisor[i].bu_hao;
            itemRes.so_luot_in = divisorfix.divisor[i].so_luot_in;
            itemRes.arrKho_kho = this.Lib.getKhoKho(divisorfix.divisor[i].kho_giay, arrKho_kho);
            itemRes.kho_kho = this.Lib.fixKhokho(divisorfix.divisor[i].kho_giay, itemRes.arrKho_kho);
            itemRes.cach_cat = this.Lib.getNumberResize(Number(itemRes.kho_kho.detail.d), Number(itemRes.kho_kho.detail.r), Number(divisorfix.divisor[i].kho_giay.d), Number(divisorfix.divisor[i].kho_giay.r), 0);
            itemRes.so_vach = this.Lib.getSoVach(divisorfix.divisor[i].so_bat * 2);
            itemRes.sl_giay_xuat = Number(itemRes.tong_to_da_bu_hao) / itemRes.cach_cat;

            constKg = Number(dl) * Number(itemRes.kho_kho.detail.d) * Number(itemRes.kho_kho.detail.r) / 10000000;
            itemRes.sl_giay_xuat_kg = (Number(itemRes.tong_to_da_bu_hao) * constKg).toFixed(2);
            if (divisorfix.divisor[i].in_cuon) {
                itemRes.arrTime = this.genTimeC(itemRes.tong_to_da_bu_hao, itemRes.so_tay);
            } else {
                itemRes.arrTime = this.genTimeR(itemRes.tong_to_da_bu_hao);
            }
            res.push(itemRes);
        }
        // console.log(res);
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

    public exportExcel() {
        let body = JSON.stringify(this.elements);
        const url = `./command/excel?data=${body}&product=${this.product.id}`;
        console.log(url);
        /*const win = window.open(url, '_blank');
        win.focus();*/
    }
}

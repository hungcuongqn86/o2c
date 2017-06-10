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
    formData: any = JSON.parse('{"zinc_type":{"bia-sel-zinc_type":"CTP"}}');
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

    public genElement() {
        this.elements = [];
        const Els = this.productType.element_config;
        for (let i = 0; i < Els.length; i++) {
            const itemG: any = this._genElement(Els[i]);
            if (itemG) {
                this.elements.push(itemG);
            }
        }
    }

    private _genElement(el: any): any {
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
        res.id = el.id;
        res.name = el.name;
        res.kho_tp = this.product.dai + 'x' + this.product.rong;
        res.mau_in = this.product.elements['bia-sel-mau_in'];
        res.sl_kem = res.mau_in.split('/')[0];
        res.zinc_type = el.properties.filter(function (itm) {
            return itm.id === 'zinc_type';
        })[0];

        // Loai giay
        const sLoaiGiay = this.product.elements['bia-sel-loai_giay'];
        let arrLoaiGiay = el.properties.filter(function (itm) {
            return itm.id === 'loai_giay';
        });
        let objLoaiGiay: any;
        if (arrLoaiGiay.length) {
            objLoaiGiay = arrLoaiGiay[0].data.filter(function (itm) {
                return itm.list_code === sLoaiGiay;
            });
        }
        let dl = 0;
        let dg = 0;
        if (objLoaiGiay) {
            res.loai_giay = objLoaiGiay[0].detail.name;
            dl = objLoaiGiay[0].detail.dl;
            dg = objLoaiGiay[0].detail.dg;
        }

        // SL giay
        const objKhoGiay = el.properties.filter(function (itm) {
            return itm.id === 'kho_giay';
        });
        let arrKhoGiay: any;
        if (objKhoGiay.length) {
            arrKhoGiay = objKhoGiay[0].data;
        }
        let sl: number;
        let detailKG: any;
        let so_to: number;

        // May in
        const objMay = el.properties.filter(function (itm) {
            return itm.id === 'may_in';
        });
        let arrMay: any;
        if (objMay.length) {
            arrMay = objMay[0].data;
        }
        // Loai kem
        const zincType = this.formData.zinc_type['bia-sel-zinc_type'];

        for (let i = 0; i < arrKhoGiay.length; i++) {
            detailKG = arrKhoGiay[i].detail;
            if (this.product.dai >= this.product.rong * 2) {
                sl = this.getSoLuong(detailKG.d, detailKG.r, this.product.dai, this.product.rong * 2, detailKG.kep_nhip);
            } else {
                sl = this.getSoLuong(detailKG.d, detailKG.r, this.product.rong * 2, this.product.dai, detailKG.kep_nhip);
            }
            so_to = Math.ceil(this.product.count / sl);
            arrKhoGiay[i].gia_giay = so_to * detailKG.d * detailKG.r * dl * dg / 10000;
            arrKhoGiay[i].may_in = this.fixPrinter(zincType, res.mau_in, detailKG, arrMay);
        }

        const fixKhoGiay = this.fixKhoGiay(arrKhoGiay);
        res.kho_in = fixKhoGiay.detail.name;
        res.may_in = fixKhoGiay.may_in.detail.name;
        console.log(fixKhoGiay);

        /*const index = el.properties.findIndex(x => x.id === 'loai_giay');
         const arrLoaiGiay = el.properties[index]['data'];*/

        return res;
    }

    private fixKhoGiay(arrKhoGiay): any {
        let dem = true;
        let mingia: number;
        let kg: any = null;
        for (let i = 0; i < arrKhoGiay.length; i++) {
            if (arrKhoGiay[i].may_in) {
                if (dem) {
                    mingia = Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem);
                    kg = arrKhoGiay[i];
                    dem = false;
                } else {
                    if ((Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem)) < mingia) {
                        mingia = Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem);
                        kg = arrKhoGiay[i];
                    }
                }
            }
        }
        return kg
    }

    private fixPrinter(zincType, mau_in, detailKG, arrMay): any {
        const somau = mau_in.split('/')[0];
        let dem = true;
        let giakem: number;
        let may: any = null;
        for (let i = 0; i < arrMay.length; i++) {
            if (somau <= arrMay[i].detail.so_mau) {
                if (this.checkSize(detailKG, arrMay[i].detail.min_size, arrMay[i].detail.max_size)) {
                    if (dem) {
                        giakem = Number(arrMay[i].detail.gia_kem[zincType]);
                        may = arrMay[i];
                        may.gia_kem = giakem;
                        dem = false;
                    } else {
                        if (Number(arrMay[i].detail.gia_kem[zincType]) < giakem) {
                            giakem = Number(arrMay[i].detail.gia_kem[zincType]);
                            may = arrMay[i];
                            may.gia_kem = giakem;
                        }
                    }
                }
            }
        }
        return may;
    }

    private checkSize(detailKG, min, max): boolean {
        const arrMin = min.split('x');
        const arrMax = max.split('x');
        if ((detailKG.r < arrMin[0]) || (detailKG.r > arrMax[0]) || (detailKG.d < arrMin[1]) || (detailKG.d > arrMax[1])) {
            return false;
        }
        return true;
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

    private getSoLuong(d, r, id, ir, kn): number {
        // console.log(d, r, id, ir, kn);
        // TH1
        const dkn = d - kn;
        let kq1 = 0;
        if ((dkn > id) && (r > ir)) {
            kq1 = Math.floor(dkn / id) * Math.floor(r / ir);
            let td1 = dkn - (Math.floor(dkn / id) * id);
            if ((td1 >= ir) && (r >= id)) {
                kq1 = kq1 + this.getSoLuong(r, td1, id, ir, 0);
            }
        }

        // TH2
        let kq2 = 0;
        if ((dkn > ir) && (r > id)) {
            kq2 = Math.floor(dkn / ir) * Math.floor(r / id);
            let tr2 = r - (Math.floor(r / id) * id);
            if ((tr2 >= ir) && (dkn >= id)) {
                kq2 = kq2 + this.getSoLuong(dkn, tr2, id, ir, 0);
            }
        }

        // TH3
        const rkn = r - kn;
        let kq3 = 0;
        if ((d > id) && (rkn > ir)) {
            kq3 = Math.floor(d / id) * Math.floor(rkn / ir);
            let td3 = d - (Math.floor(d / id) * id);
            if ((td3 >= ir) && (rkn >= id)) {
                kq3 = kq3 + this.getSoLuong(rkn, td3, id, ir, 0);
            }
        }

        // TH4
        let kq4 = 0;
        if ((d > ir) && (rkn > id)) {
            kq4 = Math.floor(d / ir) * Math.floor(rkn / id);
            let tr4 = rkn - (Math.floor(rkn / id) * id);
            if ((tr4 >= ir) && (d >= id)) {
                kq4 = kq4 + this.getSoLuong(d, tr4, id, ir, 0);
            }
        }
        //console.log(kq1, kq2, kq3, kq4);
        return Math.max(kq1, kq2, kq3, kq4);
    }
}

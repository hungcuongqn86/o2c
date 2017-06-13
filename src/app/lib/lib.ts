import * as config from '../lib/const';
import {AppModule} from "../app.module";

export class Lib {
    constructor() {
    }

    public getFunctionData(properties: any, key: string, type: string, value: string = null): any {
        const objRes = properties.filter(function (itm) {
            return itm[key] === type;
        });
        let arrRes: any = null;
        if (objRes.length) {
            if (value) {
                arrRes = objRes[0][value];
            } else {
                arrRes = objRes[0];
            }
        }
        return arrRes;
    }

    public getNumberResize(d, r, id, ir, kn): number {
        // console.log(d, r, id, ir, kn);
        // TH1
        const dkn = d - kn;
        let kq1 = 0;
        if ((dkn > id) && (r > ir)) {
            kq1 = Math.floor(dkn / id) * Math.floor(r / ir);
            let td1 = dkn - (Math.floor(dkn / id) * id);
            if ((td1 >= ir) && (r >= id)) {
                kq1 = kq1 + this.getNumberResize(r, td1, id, ir, 0);
            }
        }

        // TH2
        let kq2 = 0;
        if ((dkn > ir) && (r > id)) {
            kq2 = Math.floor(dkn / ir) * Math.floor(r / id);
            let tr2 = r - (Math.floor(r / id) * id);
            if ((tr2 >= ir) && (dkn >= id)) {
                kq2 = kq2 + this.getNumberResize(dkn, tr2, id, ir, 0);
            }
        }

        // TH3
        const rkn = r - kn;
        let kq3 = 0;
        if ((d > id) && (rkn > ir)) {
            kq3 = Math.floor(d / id) * Math.floor(rkn / ir);
            let td3 = d - (Math.floor(d / id) * id);
            if ((td3 >= ir) && (rkn >= id)) {
                kq3 = kq3 + this.getNumberResize(rkn, td3, id, ir, 0);
            }
        }

        // TH4
        let kq4 = 0;
        if ((d > ir) && (rkn > id)) {
            kq4 = Math.floor(d / ir) * Math.floor(rkn / id);
            let tr4 = rkn - (Math.floor(rkn / id) * id);
            if ((tr4 >= ir) && (d >= id)) {
                kq4 = kq4 + this.getNumberResize(d, tr4, id, ir, 0);
            }
        }
        //console.log(kq1, kq2, kq3, kq4);
        return Math.max(kq1, kq2, kq3, kq4);
    }

    public fixPrinter(zincType, zincCount, mau_in, detailKG, arrMay): any {
        const colorCov = mau_in.split('/');
        let somau = colorCov[0];
        if (colorCov[0] < colorCov[1]) {
            somau = colorCov[1];
        }
        let dem = true;
        let giakem: number = 0;
        let may: any = null;
        for (let i = 0; i < arrMay.length; i++) {
            if (somau <= arrMay[i].detail.so_mau) {
                if (this.checkSize(detailKG, arrMay[i].detail.min_size, arrMay[i].detail.max_size)) {
                    if (dem) {
                        giakem = Number(arrMay[i].detail.gia_kem[zincType]) * zincCount;
                        may = arrMay[i];
                        may.gia_kem = giakem;
                        dem = false;
                    } else {
                        if ((Number(arrMay[i].detail.gia_kem[zincType]) * zincCount) < giakem) {
                            giakem = Number(arrMay[i].detail.gia_kem[zincType]) * zincCount;
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

    public fixKhoGiay(arrKhoGiay): any {
        let dem = true;
        let mingia: number = 0;
        let kg: any = null;
        for (let i = 0; i < arrKhoGiay.length; i++) {
            if (arrKhoGiay[i].may_in) {
                if (dem) {
                    mingia = Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem);
                    if (arrKhoGiay[i].fixKhoGiay2) {
                        mingia = mingia + Number(arrKhoGiay[i].fixKhoGiay2.gia_giay) + Number(arrKhoGiay[i].fixKhoGiay2.may_in.gia_kem);
                    }
                    kg = arrKhoGiay[i];
                    dem = false;
                } else {
                    if ((Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem)) < mingia) {
                        mingia = Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem);
                        if (arrKhoGiay[i].fixKhoGiay2) {
                            mingia = mingia + Number(arrKhoGiay[i].fixKhoGiay2.gia_giay) + Number(arrKhoGiay[i].fixKhoGiay2.may_in.gia_kem);
                        }
                        kg = arrKhoGiay[i];
                    }
                }
            }
        }
        return kg
    }

    public getDivisor(num: number): any {
        let res: Array<number> = [];
        if (num < 2) {
            return null;
        }
        let index = this._getDivisor(num);
        res.push(index);
        let numDiv = num - index;
        while ((numDiv >= 2)) {
            index = this._getDivisor(numDiv);
            res.push(index);
            numDiv = numDiv - index;
        }
        return res;
    }

    private _getDivisor(num: number): number {
        if (num < 2) {
            return 0;
        }
        let index = 2;
        while (index * 2 <= num) {
            index = index * 2;
        }
        return index;
    }

    public getZincCount(colorCount: string, printConst: number, paperNumber: number): number {
        const colorCov = colorCount.split('/');
        let ZincByColor = Number(colorCov[0]) + Number(colorCov[1]);
        if (printConst === 2) {
            if (Number(colorCov[0]) > Number(colorCov[1])) {
                ZincByColor = Number(colorCov[0]) * 2;
            } else {
                ZincByColor = Number(colorCov[1]) * 2;
            }
        }
        return ZincByColor * paperNumber / printConst;
    }

    public getPaperCount(pCount: number, depreciation): number {
        let objDepreciation: any;
        for (let i = 0; i < depreciation.length; i++) {
            if ((pCount > depreciation[i].min) && (pCount <= depreciation[i].max)) {
                objDepreciation = depreciation[i];
            }
        }
        if (objDepreciation) {
            if (objDepreciation.hs === 1) {
                return objDepreciation.df;
            } else {
                return objDepreciation.hsbh + (objDepreciation.hs * pCount);
            }
        } else {
            return 0;
        }
    }


    public getQualifiedSize(arrKhoGiay, ppd, ppr, allR) {
        let res: Array<any> = [];
        for (let i = 0; i < arrKhoGiay.length; i++) {
            arrKhoGiay[i].so_bat = this._getDivisor(this.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, ppd, ppr, arrKhoGiay[i].detail.kep_nhip));
            if (arrKhoGiay[i].so_bat && arrKhoGiay[i].so_bat > 2) {
                arrKhoGiay[i].divisor = this.genDivisor(arrKhoGiay[i].so_bat, allR);
                res.push(arrKhoGiay[i])
            }
        }
        return res;
    }

    public getQualifiedSizeB(arrKhoGiay, ppd, ppr) {
        let res: Array<any> = [];
        for (let i = 0; i < arrKhoGiay.length; i++) {
            arrKhoGiay[i].so_bat = this.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, ppd, ppr, arrKhoGiay[i].detail.kep_nhip);
            if (arrKhoGiay[i].so_bat > 0) {
                res.push(arrKhoGiay[i])
            }
        }
        return res;
    }


    public genDivisor(so_bat, ppCount) {
        let res: Array<number> = [];
        let ts = so_bat;
        if (ppCount < 2) {
            return null;
        }
        // Tro khac
        let index = (Math.floor(ppCount / (ts * 2))) * (ts * 2);
        res.push(index);

        // Tro no
        let numDiv = ppCount - index;
        while ((numDiv >= ts) && (ts >= 2)) {
            index = (Math.floor(numDiv / ts)) * ts;
            res.push(index);
            numDiv = numDiv - index;
            ts = ts / 2
        }

        if (numDiv > 0) {
            res.push(numDiv);
        }
        return res;
    }
}

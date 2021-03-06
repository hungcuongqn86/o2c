import * as config from './const';
export class Lib {
    public divisor: any = [];

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

    public convertDivisor(tong_so_trang, divisor) {
        this.divisor = [];
        this._convertDivisor(divisor);
        return this.removeOrderFalse(tong_so_trang, this.divisor);
    }

    private removeOrderFalse(tong_so_trang, divisorcv) {
        const res: any = [];
        let tong = 0;
        let order = true;
        for (let i = 0; i < divisorcv.length; i++) {
            tong = 0;
            order = true;
            for (let j = 0; j < divisorcv[i].length; j++) {
                tong = tong + divisorcv[i][j].so_trang;
                if ((j > 0) && (divisorcv[i][j].so_trang > divisorcv[i][j - 1].so_trang)) {
                    //order = false;
                }
            }
            if (order && (tong === tong_so_trang)) {
                res.push(divisorcv[i]);
            }
        }
        return res;
    }

    private _convertDivisor(divisor, arrDivisorInp: Array<any> = []) {
        let arrDivisor: Array<any> = [];
        for (let i = 0; i < divisor.length; i++) {
            arrDivisor = [];
            for (let j = 0; j < arrDivisorInp.length; j++) {
                arrDivisor.push(arrDivisorInp[j]);
            }
            arrDivisor.push(divisor[i]);
            this.divisor.push(arrDivisor);
            if (divisor[i].divisor) {
                this._convertDivisor(divisor[i].divisor, arrDivisor);
            }
        }
    }

    public genDivisor(tong_so_trang, product, arrKhoGiay, GiaCongGay, in_cuon, dl) {
        const res: any = [];
        if (tong_so_trang === 0) {
            return [];
        }
        if ((tong_so_trang === 4) && (GiaCongGay === 'khau_chi')) {
            return [];
        }
        if (in_cuon) {
            for (let i = 0; i < arrKhoGiay.length; i++) {
                if (arrKhoGiay[i].detail.ic) {
                    let maxdivisor = 0; // Tuong ung so cua vao giay
                    if (Number(dl) <= 48) {
                        //Co the gap 5 vach
                        maxdivisor = 3;
                    } else {
                        //Chi co the gap den 4 vach
                        maxdivisor = 2;
                    }
                    let divisor: any = [];
                    let so_bat = this.caSoBat(this.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, product.dai, product.rong, arrKhoGiay[i].detail.kep_nhip));
                    if (tong_so_trang >= (so_bat * 2)) {
                        let so_tay = Math.floor(tong_so_trang / (so_bat * 2));
                        let so_trang = so_tay * so_bat * 2;
                        let le_s = tong_so_trang - so_trang;
                        if ((le_s === 4) && (GiaCongGay === 'khau_chi')) {
                            so_tay = so_tay - 1;
                            so_trang = so_tay * so_bat * 2;
                        }
                        let le = tong_so_trang - so_trang;
                        if (so_tay <= maxdivisor) {
                            const item = {
                                'tro_khac': true,
                                'in_cuon': true,
                                'so_trang': so_trang,
                                'kho_giay': arrKhoGiay[i].detail,
                                'so_bat': so_bat,
                                'so_tay': 1
                            };
                            if (le > 0) {
                                divisor = this.genDivisor(le, product, arrKhoGiay, GiaCongGay, false, dl);
                                item['divisor'] = divisor;
                            }
                            res.push(item);
                        } else {
                            let so_nguyen = Math.floor(so_tay / maxdivisor);
                            let so_trang_div1 = so_nguyen * maxdivisor * so_bat * 2;
                            let checkle16 = false;
                            if ((maxdivisor === 3) && (so_trang - so_trang_div1 === 16)) {
                                so_trang_div1 = so_trang_div1 - (so_bat * 2 * maxdivisor);
                                so_nguyen = so_nguyen - 1;
                                checkle16 = true;
                            }
                            const item1 = {
                                'tro_khac': true,
                                'in_cuon': true,
                                'so_trang': so_trang_div1,
                                'kho_giay': arrKhoGiay[i].detail,
                                'so_bat': so_bat,
                                'so_tay': so_nguyen
                            };
                            if (so_trang_div1 < so_trang) {
                                const so_trang_div2 = so_trang - so_trang_div1;
                                const tay_tinh_lai = checkle16 ? so_trang_div2 / (so_bat * 2 * 2) : 1;
                                const item2 = {
                                    'tro_khac': true,
                                    'in_cuon': true,
                                    'so_trang': so_trang_div2,
                                    'kho_giay': arrKhoGiay[i].detail,
                                    'so_bat': so_bat,
                                    'so_tay': tay_tinh_lai
                                };
                                if (le > 0) {
                                    divisor = this.genDivisor(le, product, arrKhoGiay, GiaCongGay, false, dl);
                                    item2['divisor'] = divisor;
                                }
                                item1['divisor'] = [item2];
                            } else {
                                if (le > 0) {
                                    divisor = this.genDivisor(le, product, arrKhoGiay, GiaCongGay, false, dl);
                                    item1['divisor'] = divisor;
                                }
                            }
                            res.push(item1);
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < arrKhoGiay.length; i++) {
                let le = tong_so_trang;
                let le_s = 0;
                let tro_khac = false;
                let so_trang = 0;
                let so_tay = 0;
                let divisor: any = [];
                let so_bat = this.caSoBat(this.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, product.dai, product.rong, arrKhoGiay[i].detail.kep_nhip));
                if (le >= 4) {
                    if (so_bat > 0) {
                        if ((so_bat !== 2) || (GiaCongGay !== 'khau_chi')) {
                            so_tay = Math.floor(le / (so_bat * 2));
                            if (so_tay > 0) {
                                tro_khac = true;
                                so_trang = so_tay * so_bat * 2;
                                le_s = le - so_trang;
                                if ((le_s === 4) && (GiaCongGay === 'khau_chi')) {
                                    so_tay = so_tay - 1;
                                    so_trang = so_tay * so_bat * 2;
                                    le = le - so_trang;
                                } else {
                                    le = le_s;
                                }
                            } else {
                                tro_khac = false;
                                let so_bat_tro_no = so_bat;
                                while ((so_bat_tro_no > le) && (so_bat_tro_no > 2)) {
                                    so_bat_tro_no = so_bat_tro_no / 2;
                                }
                                if ((so_bat_tro_no >= 4) && (so_bat_tro_no % 2 === 0)) {
                                    so_trang = so_bat_tro_no;
                                    le_s = le - so_trang;
                                    if ((le_s !== 4) || (GiaCongGay !== 'khau_chi')) {
                                        so_tay = 1;
                                        le = le_s;
                                    }
                                }
                            }

                            if (so_tay > 0) {
                                const item = {
                                    'tro_khac': tro_khac,
                                    'so_trang': so_trang,
                                    'kho_giay': arrKhoGiay[i].detail,
                                    'so_bat': so_bat,
                                    'so_tay': so_tay
                                };
                                if (le > 0) {
                                    divisor = this.genDivisor(le, product, arrKhoGiay, GiaCongGay, in_cuon, dl);
                                    item['divisor'] = divisor;
                                }
                                res.push(item);
                            }
                        }
                    }
                } else {
                    if (so_bat > 0) {
                        const item = {
                            'tro_khac': false,
                            'so_trang': le,
                            'kho_giay': arrKhoGiay[i].detail,
                            'so_bat': so_bat,
                            'so_tay': 1
                        };
                        res.push(item);
                    }
                }
            }
        }
        return res;
    }

    private caSoBat(number) {
        const arrValue = config.arrSoBat;
        for (let i = 0; i < arrValue.length; i++) {
            if (number >= arrValue[i]) {
                return arrValue[i];
            }
        }
        return 0;
    }


    public getNumberResize11(d, r, id, ir, kn): number {
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
        return Math.max(kq1, kq2, kq3, kq4);
    }

    public getSoVach(batx2) {
        if (batx2 < 2) {
            return 0;
        }
        let index = 2;
        let res = 0;
        while (index * 2 <= batx2) {
            res = res + 1;
            index = index * 2;
        }
        return res;
    }

    public getNumberResize(d, r, id, ir, kn): number {
        // console.log(d, r, id, ir, kn);
        // TH1
        const dkn = d - kn;
        let kq1 = 0;
        if ((dkn >= id) && (r >= ir)) {
            kq1 = Math.floor(dkn / id) * Math.floor(r / ir);
            let td1 = dkn - (Math.floor(dkn / id) * id);
            if ((td1 >= ir) && (r >= id)) {
                kq1 = kq1 + this.getNumberResize(r, td1, id, ir, 0);
            }
        }

        // TH2
        let kq2 = 0;
        if ((dkn >= ir) && (r >= id)) {
            kq2 = Math.floor(dkn / ir) * Math.floor(r / id);
            let tr2 = r - (Math.floor(r / id) * id);
            if ((tr2 >= ir) && (dkn >= id)) {
                kq2 = kq2 + this.getNumberResize(dkn, tr2, id, ir, 0);
            }
        }

        // TH3
        const rkn = r - kn;
        let kq3 = 0;
        if ((d >= id) && (rkn >= ir)) {
            kq3 = Math.floor(d / id) * Math.floor(rkn / ir);
            let td3 = d - (Math.floor(d / id) * id);
            if ((td3 >= ir) && (rkn >= id)) {
                kq3 = kq3 + this.getNumberResize(rkn, td3, id, ir, 0);
            }
        }

        // TH4
        let kq4 = 0;
        if ((d >= ir) && (rkn >= id)) {
            kq4 = Math.floor(d / ir) * Math.floor(rkn / id);
            let tr4 = rkn - (Math.floor(rkn / id) * id);
            if ((tr4 >= ir) && (d >= id)) {
                kq4 = kq4 + this.getNumberResize(d, tr4, id, ir, 0);
            }
        }
        //console.log(kq1, kq2, kq3, kq4);
        return Math.max(kq1, kq2, kq3, kq4);
    }

    public fixPrinter(zincType, zincCount, mau_in, detailKG, arrMay, luot_in, in_cuon = false): any {
        const colorCov = mau_in.split('/');
        let somau = colorCov[0];
        if (colorCov[0] < colorCov[1]) {
            somau = colorCov[1];
        }
        let dem = true;
        let giakem: number = 0;
        let cpin: number = 0;
        let chiphi: number = 0;
        let may: any = [];
        for (let i = 0; i < arrMay.length; i++) {
            if (arrMay[i].detail && in_cuon === arrMay[i].detail.in_cuon) {
                if (somau <= arrMay[i].detail.so_mau) {
                    if (this.checkSize(detailKG, arrMay[i].detail.min_size, arrMay[i].detail.max_size)) {
                        if (dem) {
                            giakem = Number(arrMay[i].detail.gia_kem[zincType]) * zincCount;
                            if (luot_in < 1000) {
                                cpin = zincCount * arrMay[i].detail.cong_in_kem;
                            } else {
                                cpin = zincCount * arrMay[i].detail.cong_in_kem + ((luot_in - 1000) * arrMay[i].detail.cong_in_luot);
                            }
                            chiphi = giakem + cpin;
                            Object.keys(arrMay[i]).map((index) => {
                                may[index] = arrMay[i][index];
                            });
                            may.gia_kem = giakem;
                            may.cong_in = cpin;
                            dem = false;
                        } else {
                            giakem = Number(arrMay[i].detail.gia_kem[zincType]) * zincCount;
                            if (luot_in < 1000) {
                                cpin = zincCount * arrMay[i].detail.cong_in_kem;
                            } else {
                                cpin = zincCount * arrMay[i].detail.cong_in_kem + ((luot_in - 1000) * arrMay[i].detail.cong_in_luot);
                            }
                            if ((giakem + cpin) < chiphi) {
                                chiphi = giakem + cpin;
                                Object.keys(arrMay[i]).map((index) => {
                                    may[index] = arrMay[i][index];
                                });
                                may.gia_kem = giakem;
                                may.cong_in = cpin;
                            }
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
        if ((detailKG.r < Number(arrMin[0])) || (detailKG.r > Number(arrMax[0])) || (detailKG.d < Number(arrMin[1])) || (detailKG.d > Number(arrMax[1]))) {
            return false;
        }
        return true;
    }

    public fixKhoGiay(arrKhoGiay): any {
        let dem = true;
        let mingia: number = 0;
        let kg: any = [];
        for (let i = 0; i < arrKhoGiay.length; i++) {
            if (arrKhoGiay[i].may_in.id) {
                if (dem) {
                    mingia = Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem) + Number(arrKhoGiay[i].may_in.cong_in);
                    if (arrKhoGiay[i].fixKhoGiay2) {
                        mingia = mingia + Number(arrKhoGiay[i].fixKhoGiay2.gia_giay) + Number(arrKhoGiay[i].fixKhoGiay2.may_in.gia_kem) + Number(arrKhoGiay[i].fixKhoGiay2.may_in.cong_in);
                    }
                    Object.keys(arrKhoGiay[i]).map((index) => {
                        kg[index] = arrKhoGiay[i][index];
                    });
                    dem = false;
                } else {
                    let giakt = Number(arrKhoGiay[i].gia_giay) + Number(arrKhoGiay[i].may_in.gia_kem) + Number(arrKhoGiay[i].may_in.cong_in);
                    if (arrKhoGiay[i].fixKhoGiay2) {
                        giakt = giakt + Number(arrKhoGiay[i].fixKhoGiay2.gia_giay) + Number(arrKhoGiay[i].fixKhoGiay2.may_in.gia_kem) + Number(arrKhoGiay[i].fixKhoGiay2.may_in.cong_in);
                    }
                    if (giakt < mingia) {
                        mingia = giakt;
                        Object.keys(arrKhoGiay[i]).map((index) => {
                            kg[index] = arrKhoGiay[i][index];
                        });
                    }
                }
            }
        }
        return kg
    }

    public getKhoKho(fixKhoGiay, arrKho_kho) {
        let res: any = [];
        for (let i = 0; i < arrKho_kho.data.length; i++) {
            if ((Number(arrKho_kho.data[i].detail.d) >= Number(fixKhoGiay.d)) && (Number(arrKho_kho.data[i].detail.r) >= Number(fixKhoGiay.r))) {
                res.push(arrKho_kho.data[i]);
            }
        }
        arrKho_kho.data = res;
        return arrKho_kho;
    }

    public fixKhokho(fixKhoGiay, arrKho_kho) {
        let res: any = [];
        let min = 0;
        let dem = true;
        for (let i = 0; i < arrKho_kho.data.length; i++) {
            if ((Number(arrKho_kho.data[i].detail.d) >= Number(fixKhoGiay.d)) && (Number(arrKho_kho.data[i].detail.r) >= Number(fixKhoGiay.r))) {
                if (dem) {
                    min = (Number(arrKho_kho.data[i].detail.d) - Number(fixKhoGiay.d)) + (Number(arrKho_kho.data[i].detail.r) - Number(fixKhoGiay.r));
                    Object.keys(arrKho_kho.data[i]).map((index) => {
                        res[index] = arrKho_kho.data[i][index];
                    });
                    dem = false;
                } else {
                    if ((Number(arrKho_kho.data[i].detail.d) - Number(fixKhoGiay.d)) + (Number(arrKho_kho.data[i].detail.r) - Number(fixKhoGiay.r)) < min) {
                        min = (Number(arrKho_kho.data[i].detail.d) - Number(fixKhoGiay.d)) + (Number(arrKho_kho.data[i].detail.r) - Number(fixKhoGiay.r));
                        Object.keys(arrKho_kho.data[i]).map((index) => {
                            res[index] = arrKho_kho.data[i][index];
                        });
                    }
                }
            }
        }
        return res;
    }

    public getDivisor(num: number): any {
        let res: Array<number> = [];
        if (num < 2) {
            return null;
        }
        let index = this._getSobat(num);
        res.push(index);
        let numDiv = num - index;
        while ((numDiv >= 2)) {
            index = this._getSobat(numDiv);
            res.push(index);
            numDiv = numDiv - index;
        }
        return res;
    }

    public _getSobat(num: number): number {
        if (num < 2) {
            return 0;
        }
        let index = 2;
        while (index * 2 <= num) {
            index = index * 2;
        }
        return index;
    }

    public getZincCountR(colorCount: string, printConst: number, paperNumber: number): number {
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

    public getZincCountC(colorCount: string, paperNumber: number): number {
        const colorCov = colorCount.split('/');
        let somau = Number(colorCov[0]);
        if (colorCov[0] < colorCov[1]) {
            somau = Number(colorCov[1]);
        }
        return somau * paperNumber / 8;
    }

    public getBuhaoBia(luot: number, mau, depreciation: any): number {
        const colorCov = mau.split('/');
        let somau = Number(colorCov[0]);
        if (colorCov[0] < colorCov[1]) {
            somau = Number(colorCov[1]);
        }

        let objDepreciation: any;
        for (let i = 0; i < depreciation.length; i++) {
            if ((luot > depreciation[i].min) && (luot <= depreciation[i].max)) {
                objDepreciation = depreciation[i];
            }
        }
        if (objDepreciation) {
            // console.log(objDepreciation);
            return objDepreciation.mau[somau - 1];
        } else {
            return 0;
        }
    }

    public getBuhao(luot: number, dl: number, mau, depreciationR: any, depreciationC: any, in_cuon = false): number {
        const colorCov = mau.split('/');
        let somau = Number(colorCov[0]);
        if (colorCov[0] < colorCov[1]) {
            somau = Number(colorCov[1]);
        }

        let objDepreciation: any;
        if (in_cuon) {
            for (let i = 0; i < depreciationC.length; i++) {
                if ((luot > depreciationC[i].min) && (luot <= depreciationC[i].max)) {
                    objDepreciation = depreciationC[i];
                }
            }

            let objDepreciationSM: any;
            for (let i = 0; i < objDepreciation.so_mau.length; i++) {
                if (somau == objDepreciation.so_mau[i].number) {
                    objDepreciationSM = objDepreciation.so_mau[i];
                }
            }

            return objDepreciationSM.value;
        } else {
            for (let i = 0; i < depreciationR.length; i++) {
                if ((luot > depreciationR[i].min) && (luot <= depreciationR[i].max)) {
                    objDepreciation = depreciationR[i];
                }
            }

            let objDepreciationDl: any;
            for (let i = 0; i < objDepreciation.dl.length; i++) {
                if ((dl > objDepreciation.dl[i].min) && (dl <= objDepreciation.dl[i].max)) {
                    objDepreciationDl = objDepreciation.dl[i];
                }
            }
            return objDepreciationDl.mau[somau - 1];
        }
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
            arrKhoGiay[i].so_bat = this._getSobat(this.getNumberResize(arrKhoGiay[i].detail.d, arrKhoGiay[i].detail.r, ppd, ppr, arrKhoGiay[i].detail.kep_nhip));
            if (arrKhoGiay[i].so_bat && arrKhoGiay[i].so_bat > 2) {
                arrKhoGiay[i].divisor = this.genDivisorIc(arrKhoGiay[i].so_bat, allR);
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
                let kg: any = [];
                Object.keys(arrKhoGiay[i]).map((index) => {
                    kg[index] = arrKhoGiay[i][index];
                });
                res.push(kg)
            }
        }
        return res;
    }


    public genDivisorIc(so_bat, ppCount, maxdivisor = 0, GiaCongGay = '') {
        let tle = ppCount;
        let st = 0;
        const mindivisor = so_bat * 2;
        if (tle >= mindivisor) {
            st = Math.floor(tle / (so_bat * 2));
            tle = tle - (st * (so_bat * 2));
            if (GiaCongGay === 'khau_chi') {
                if ((tle > 2) && (tle < 8)) {
                    st = st - 1;
                    tle = tle + (so_bat * 2);
                }
            }
        }

        let res: Array<any> = [];
        let le = ppCount - tle;
        const sovach: Array<number> = [];
        let divindex = maxdivisor;
        let divcount = (so_bat * 2) * maxdivisor;
        if (le >= mindivisor) {
            while (divcount > le) {
                divindex = divindex - 1;
                divcount = (so_bat * 2) * divindex;
            }

            while ((le >= divcount) && (divcount >= mindivisor)) {
                sovach.push(2 + divindex);
                const _item = (Math.floor(le / divcount)) * divcount;
                res.push(_item);
                le = le - _item;
                while (divcount > le) {
                    divindex = divindex - 1;
                    divcount = (so_bat * 2) * divindex;
                }
            }
        }
        return [res, sovach, tle];
    }

    public genDivisorTr(so_bat, ppCount) {
        let res: Array<any> = [];
        let ts = so_bat * 2;
        let item = 0;
        let le = ppCount;

        if (le > ts) {
            item = (Math.floor(le / ts)) * ts;
            res.push(item);
            le = le - item;
            ts = ts / 2;
        }
        while (ts > le) {
            ts = ts / 2;
        }
        while ((le >= ts) && (ts >= 2)) {
            item = (Math.floor(le / ts)) * ts;
            res.push(item);
            le = le - item;
            ts = ts / 2;
            while (ts > le) {
                ts = ts / 2;
            }
        }
        if (le > 0) {
            res.push(le);
        }
        return res;
    }

    public getMatIn(mau_in): number {
        const colorCov = mau_in.split('/');
        let res = 0;
        if (colorCov[0] > 0) {
            res++;
        }
        if (colorCov[1] > 0) {
            res++;
        }
        return res;
    }
}

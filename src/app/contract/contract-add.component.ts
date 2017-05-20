import {Component, ViewChild, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {contractService}    from  './contract.service';
import {ConfirmComponent} from '../confirm.component';
import {AlertComponent} from '../alert.component';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-contract-add',
    templateUrl: './contract-add.component.html',
    styleUrls: ['./contract.component.css']
})

export class ContractAddComponent implements OnInit {
    @ViewChild('form') form: NgModel;
    @ViewChild('form1') form1: NgModel;
    detail: any = JSON.parse('{"id":0,"code":"","signdate":"","customer_id":"","content":"","value":"","durationdate":""}');
    products: any = [];
    recordId: number = 0;
    customer: any = [];
    res: any;

    titleAction: string = 'COMMON.ADD_LABLE';

    constructor(private translate: TranslateService, private contractService: contractService, private router: Router, private route: ActivatedRoute, private dialogService: DialogService) {
        this.route.params.forEach((params: Params) => {
            if (params['id'] && params['id'].length) {
                this.recordId = params['id'];
            }
        });
        if (this.recordId) {
            this.titleAction = 'COMMON.EDIT_LABLE';
            this.getDetail(this.recordId.toString());
            this.getProduct(this.recordId.toString());
        }
    }

    ngOnInit() {
        this.getCustomersData();
        this.getListData();
    }

    private getDetail(id: string) {
        this.contractService.getSingle(id).subscribe(
            data => {
                this.detail = data;
            },
            error => {
                console.error("Not detail!");
                return Observable.throw(error);
            }
        );
    }

    private getProduct(id: string) {
        this.contractService.getProduct(id).subscribe(
            data => {
                this.products = data;
            },
            error => {
                console.error("Not products!");
                return Observable.throw(error);
            }
        );
    }

    getCustomersData() {
        this.contractService.getCustomersData().subscribe(
            data => {
                this.customer = data;
            },
            error => {
                console.error("Not customer!");
                return Observable.throw(error);
            }
        );
    }

    private saveRecord() {
        this.contractService.saveRecord(this.detail).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    console.log(111);
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

    private showConfirm() {
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Xác nhận xóa dữ liệu',
            message: 'Bạn chắc chắn muốn xóa hợp đồng này!'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteRecord();
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    private deleteRecord() {
        this.contractService.deleteRecord(this.recordId.toString()).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.goBack();
                } else if (res.error == true) {
                    console.error(res.message[0]);
                }
            },
            error => {
                console.error("Add Error!");
                return Observable.throw(error);
            }
        );
    }

    private getListData() {
        this.contractService.getListData().subscribe(
            data => {
                this.genListData(data.data);
            },
            error => {
                console.error("Not menu!");
                return Observable.throw(error);
            }
        );
    }

    unitList: any = [];
    standardList: any = [];
    outsourcingList: any = [];
    packingList: any = [];
    moldList: any = [];
    number_handList: any = [];
    print_typeList: any = [];
    print_sizeList: any = [];
    print_colorList: any = [];
    zinc_typeList: any = [];
    machineList: any = [];
    paper_typeList: any = [];
    size_storeList: any = [];
    cut_typeList: any = [];
    number_charList: any = [];

    private genListData(data: any) {
        Object.keys(data).map((key) => {
            if (data[key].listtype_code == 'unit') {
                this.unitList.push(data[key]);
            }
            if (data[key].listtype_code == 'standard') {
                this.standardList.push(data[key]);
            }
            if (data[key].listtype_code == 'outsourcing') {
                this.outsourcingList.push(data[key]);
            }
            if (data[key].listtype_code == 'packing') {
                this.packingList.push(data[key]);
            }
            if (data[key].listtype_code == 'mold') {
                this.moldList.push(data[key]);
            }
            if (data[key].listtype_code == 'number_hand') {
                this.number_handList.push(data[key]);
            }
            if (data[key].listtype_code == 'print_type') {
                this.print_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'print_size') {
                this.print_sizeList.push(data[key]);
            }
            if (data[key].listtype_code == 'print_color') {
                this.print_colorList.push(data[key]);
            }
            if (data[key].listtype_code == 'zinc_type') {
                this.zinc_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'machine') {
                this.machineList.push(data[key]);
            }
            if (data[key].listtype_code == 'paper_type') {
                this.paper_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'size_store') {
                this.size_storeList.push(data[key]);
            }
            if (data[key].listtype_code == 'cut_type') {
                this.cut_typeList.push(data[key]);
            }
            if (data[key].listtype_code == 'number_char') {
                this.number_charList.push(data[key]);
            }
        });
    }

    private goBack() {
        this.router.navigate(['/contract']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
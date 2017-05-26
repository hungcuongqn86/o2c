import {Component, ViewChild, OnInit, AfterViewInit, NgZone, Inject} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {contractService}    from  './contract.service';
import {ConfirmComponent} from '../confirm.component';
import {AlertComponent} from '../alert.component';
import {NgUploaderOptions, UploadedFile} from 'ngx-uploader';
import {ProductDetailComponent} from './product-detail.component';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-contract-add',
    templateUrl: './contract-add.component.html',
    styleUrls: ['./contract.component.css']
})

export class ContractAddComponent implements OnInit, AfterViewInit {
    @ViewChild('form') form: NgModel;
    @ViewChild('form1') form1: NgModel;
    detail: any = JSON.parse('{"id":0,"code":"","signdate":"","customer_id":"","content":"","value":"","durationdate":"","image":"","upload":0,"FILE_VIEW":"","FILE_ENCODE":""}');
    products: any = [];
    recordId: number = 0;
    customer: any = [];

    options: NgUploaderOptions;
    response: any;
    filenameview: string = '';
    fileencode: string;
    hasBaseDropZoneOver: boolean = true;
    sizeLimit: number = 1000000; // 1MB
    res: any;

    checklist: Array<any> = [];
    checkall: boolean = false;

    titleAction: string = 'COMMON.ADD_LABLE';

    constructor(private translate: TranslateService, private contractService: contractService, private router: Router, private route: ActivatedRoute, private dialogService: DialogService, @Inject(NgZone) private zone: NgZone) {
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
        this.options = new NgUploaderOptions({
            url: './api/upload',
            autoUpload: true,
            calculateSpeed: true
        });
    }

    ngOnInit() {
        this.getCustomersData();
        this.getListData();
    }

    private getDetail(id: string) {
        this.contractService.getSingle(id).subscribe(
            data => {
                this.detail = data;
                this.filenameview = this.detail.FILE_VIEW;
                this.fileencode = this.detail.FILE_ENCODE;
            },
            error => {
                console.error("Not detail!");
                return Observable.throw(error);
            }
        );
    }

    public getProduct(id: string) {
        this.checklist = [];
        if (id != '') {
            this.contractService.getProduct(id).subscribe(
                data => {
                    this.products = data;
                },
                error => {
                    console.error("Not products!");
                    return Observable.throw(error);
                }
            );
        } else {
            this.products = [];
        }
    }

    public checkboxtoggle() {
        if (this.checkall) {
            this.checkall = false;
            this.checklist = [];
            for (let i = 0; i < this.products.length; i++) {
                let value: number = this.products[i].id;
                (<HTMLInputElement>document.getElementById(value.toString())).checked = false;
            }
        } else {
            this.checkall = true;
            this.checklist = [];
            for (let i = 0; i < this.products.length; i++) {
                let value: number = this.products[i].id;
                (<HTMLInputElement>document.getElementById(value.toString())).checked = true;
                this.checklist.push(value);
            }
        }
    }

    private showAlert(message: string) {
        this.dialogService.addDialog(AlertComponent, {title: 'Thông báo!', message: message})
            .subscribe(() => {
                //console.log(111111);
            });
    }

    public deleteProdConfirm() {
        if (this.checklist.length == 0) {
            this.showAlert('Bạn phải chọn sản phẩm muốn xóa!');
            return false;
        }

        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Xác nhận xóa dữ liệu',
            message: 'Bạn chắc chắn muốn xóa sản phẩm này!'
        })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteProd();
                }
            });
        setTimeout(() => {
            disposable.unsubscribe();
        }, 10000);
    }

    private deleteProd() {
        let idlist: string = '';
        if (this.checklist.length > 0) {
            idlist = this.checklist.join(',');
        }
        this.contractService.deleteProd(idlist).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.getProduct(this.recordId.toString());
                } else if (res.error == true) {
                    console.error(res.message[0]);
                }
            },
            error => {
                console.error("Delete Error!");
                return Observable.throw(error);
            }
        );
    }

    public checkedItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.checklist.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.checklist.indexOf(value);
            if (indexx >= 0) {
                this.checklist.splice(indexx, 1);
            }
        }
    }

    public addProduct() {
        this.dialogService.addDialog(ProductDetailComponent, {
            id: 0,
            contract_id: this.recordId,
            title: 'Thêm mới sản phẩm'
        })
            .subscribe((message) => {
                this.getProduct(this.recordId.toString());
            });
    }

    public editProduct() {
        if (this.checklist.length == 0) {
            this.showAlert('Bạn phải chọn sản phẩm muốn sửa!');
            return false;
        }
        if (this.checklist.length > 1) {
            this.showAlert('Bạn chỉ được chọn một sản phẩm muốn sửa!');
            return false;
        }
        this.dialogService.addDialog(ProductDetailComponent, {
            id: this.checklist[0],
            contract_id: this.recordId,
            title: 'Thêm mới sản phẩm'
        })
            .subscribe((message) => {
                this.getProduct(this.recordId.toString());
            });
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
                    // console.log(111);
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

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            console.log('File is too large!');
        }
    }

    handleUpload(data: any) {
        setTimeout(() => {
            this.zone.run(() => {
                this.response = data;
                if (data && data.response) {
                    this.res = JSON.parse(data.response);
                    if (this.res.error == false) {
                        this.detail.image = this.res.data.PATH;
                        this.detail.upload = 1;
                        this.filenameview = this.res.data.FILE_VIEW;
                        this.fileencode = this.res.data.FILE_ENCODE;
                    } else {
                        this.detail.upload = 0;
                        this.detail.image = '';
                    }
                }
            });
        });
    }

    fileOverBase(e: boolean) {
        this.hasBaseDropZoneOver = e;
    }
}
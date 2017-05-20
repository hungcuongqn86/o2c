import {Component, ViewChild, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {producttypeService}    from  './producttype.service';
import {ConfirmComponent} from '../confirm.component';
import {AlertComponent} from '../alert.component';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-contract-detail',
    templateUrl: './producttype-detail.component.html',
    styleUrls: ['./producttype.component.css']
})

export class ProducttypeDetailComponent implements OnInit {
    @ViewChild('form') form: NgModel;
    @ViewChild('form1') form1: NgModel;
    config: any = JSON.parse('{"code":"","name":"","size_config":""}');
    detail: any = JSON.parse('{"id":0,"code":"","name":"","size_config":"","color_config":"","paper_type_config":"","number_page":0,"hardcover":0,"annex":0,"sheet_hung":0,"outsource_type_config":"","enabled":0}');
    recordId: number = 0;
    customer: any = [];
    res: any;

    sizeSelected: Array<any> = [];
    colorSelected: Array<any> = [];
    paperTypeSelected: Array<any> = [];
    outsourceTypeSelected: Array<any> = [];

    titleAction: string = 'COMMON.ADD_LABLE';

    constructor(private translate: TranslateService, private producttypeService: producttypeService, private router: Router, private route: ActivatedRoute, private dialogService: DialogService) {
        this.route.params.forEach((params: Params) => {
            if (params['id'] && params['id'].length) {
                this.recordId = params['id'];
            }
        });
        if (this.recordId) {
            this.titleAction = 'COMMON.EDIT_LABLE';
            this.getDetail(this.recordId.toString());
        }
    }

    ngOnInit() {
        this.getConfig();
    }

    private getConfig() {
        this.producttypeService.getConfig().subscribe(
            data => {
                this.config = data;
            },
            error => {
                console.error("Not config!");
                return Observable.throw(error);
            }
        );
    }

    private getDetail(id: string) {
        this.producttypeService.getSingle(id).subscribe(
            data => {
                this.detail = data;
                if (this.detail.size_config != '') {
                    this.sizeSelected = this.detail.size_config.split(',');
                }
                if (this.detail.color_config != '') {
                    this.colorSelected = this.detail.color_config.split(',');
                }
                if (this.detail.paper_type_config != '') {
                    this.paperTypeSelected = this.detail.paper_type_config.split(',');
                }
                if (this.detail.outsource_type_config != '') {
                    this.outsourceTypeSelected = this.detail.outsource_type_config.split(',');
                }
            },
            error => {
                console.error("Not user!");
                return Observable.throw(error);
            }
        );
    }

    private saveRecord() {
        if (this.sizeSelected.length > 0) {
            this.detail.size_config = this.sizeSelected.join(',');
        } else {
            this.detail.size_config = '';
        }

        if (this.colorSelected.length > 0) {
            this.detail.color_config = this.colorSelected.join(',');
        } else {
            this.detail.color_config = '';
        }

        if (this.paperTypeSelected.length > 0) {
            this.detail.paper_type_config = this.paperTypeSelected.join(',');
        } else {
            this.detail.paper_type_config = '';
        }

        if (this.outsourceTypeSelected.length > 0) {
            this.detail.outsource_type_config = this.outsourceTypeSelected.join(',');
        } else {
            this.detail.outsource_type_config = '';
        }
        this.producttypeService.saveRecord(this.detail).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.router.navigate(['/producttype']);
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
        this.producttypeService.deleteRecord(this.recordId.toString()).subscribe(
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

    private goBack() {
        this.router.navigate(['/producttype']);
    }

    checkedSizeItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.sizeSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.sizeSelected.indexOf(value);
            if (indexx >= 0) {
                this.sizeSelected.splice(indexx, 1);
            }
        }
    }

    checkedColorItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.colorSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.colorSelected.indexOf(value);
            if (indexx >= 0) {
                this.colorSelected.splice(indexx, 1);
            }
        }
    }

    checkedPaperTypeItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.paperTypeSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.paperTypeSelected.indexOf(value);
            if (indexx >= 0) {
                this.paperTypeSelected.splice(indexx, 1);
            }
        }
    }

    checkedOutsourceItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.outsourceTypeSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.outsourceTypeSelected.indexOf(value);
            if (indexx >= 0) {
                this.outsourceTypeSelected.splice(indexx, 1);
            }
        }
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
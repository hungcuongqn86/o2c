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
    elements: any = [];
    detail: any = JSON.parse('{"id":0,"code":"","name":"","size_config":"","element_config":"","image":"","enabled":0}');
    recordId: number = 0;
    customer: any = [];
    res: any;

    sizeSelected: Array<any> = [];
    elementSelected: Array<any> = [];

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
        this.getElement();
    }

    private getElement() {
        this.producttypeService.getElement().subscribe(
            data => {
                this.elements = data;
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
                if (this.detail.element_config != '') {
                    this.elementSelected = this.detail.element_config.split(',');
                }
            },
            error => {
                console.error("Not producttype!");
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

        if (this.elementSelected.length > 0) {
            this.detail.element_config = this.elementSelected.join(',');
        } else {
            this.detail.element_config = '';
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
            message: 'Bạn chắc chắn muốn xóa loại sản phẩm này!'
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

    checkedElementItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.elementSelected.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.elementSelected.indexOf(value);
            if (indexx >= 0) {
                this.elementSelected.splice(indexx, 1);
            }
        }
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
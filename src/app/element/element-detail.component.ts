import {Component, ViewChild, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ElementService}    from  './element.service';
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-contract-detail',
    templateUrl: './element-detail.component.html',
    styleUrls: ['./element.component.css']
})

export class ElementDetailComponent implements OnInit {
    @ViewChild('form') form: NgModel;
    detail: any = JSON.parse('{"id":0,"name":"","properties":"","data":""}');
    arrSelect: any = [];
    arrValue: any = [];
    res: any;
    recordId;

    constructor(private translate: TranslateService, private ElementService: ElementService, private router: Router, private route: ActivatedRoute) {
        this.route.params.forEach((params: Params) => {
            if (params['id'] && params['id'].length) {
                this.recordId = params['id'];
            }
        });
    }

    ngOnInit() {
        this.getDetail(this.recordId);
        this.getSingleElement(this.recordId);
    }

    private getDetail(id: string) {
        this.ElementService.getSingle(id).subscribe(
            data => {
                this.detail = data;
            },
            error => {
                console.error("Not element!");
                return Observable.throw(error);
            }
        );
    }

    private getSingleElement(id: string) {
        this.ElementService.getSingleElement(id).subscribe(
            data => {
                this.arrValue = data;
                this.convertValue();
            },
            error => {
                console.error("Not element!");
                return Observable.throw(error);
            }
        );
    }

    private convertValue() {
        if (this.arrValue.properties && this.arrValue.properties.length) {
            for (let i = 0; i < this.arrValue.properties.length; i++) {
                if (this.arrValue.properties[i].data) {
                    for (let j = 0; j < this.arrValue.properties[i].data.length; j++) {
                        const value = this.arrValue.properties[i].data[j].properties_code + '#' + this.arrValue.properties[i].data[j].list_code;
                        this.arrSelect.push(value);
                        // console.log(this.arrValue.properties[i].data[j]);
                    }
                }
            }
        }
    }

    private saveRecord() {
        this.detail.data = JSON.stringify(this.arrSelect);
        this.ElementService.saveRecord(this.detail).subscribe(
            res => {
                this.res = res;
                if (res.error == false) {
                    this.router.navigate(['/element']);
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

    public checkedItems(value: string) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.arrSelect.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx: number = this.arrSelect.indexOf(value);
            if (indexx >= 0) {
                this.arrSelect.splice(indexx, 1);
            }
        }
        // console.log(this.arrSelect);
    }

    private goBack() {
        this.router.navigate(['/element']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
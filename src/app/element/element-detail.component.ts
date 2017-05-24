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
    detail: any = JSON.parse('{"id":0,"code":"","name":"","size_config":"","color_config":"","paper_type_config":"","number_page":0,"hardcover":0,"annex":0,"sheet_hung":0,"outsource_type_config":"","enabled":0}');
    res: any;

    constructor(private translate: TranslateService, private ElementService: ElementService, private router: Router, private route: ActivatedRoute) {
        this.route.params.forEach((params: Params) => {
            if (params['id'] && params['id'].length) {
                this.recordId = params['id'];
            }
        });
    }

    ngOnInit() {
        //this.getConfig();
    }

    private getDetail(id: string) {
        /*this.producttypeService.getSingle(id).subscribe(
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
        );*/
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
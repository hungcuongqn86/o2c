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
    detail: any = JSON.parse('{"id":0,"name":"","properties":""}');
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
    }

    private getDetail(id: string) {
        this.ElementService.getSingle(id).subscribe(
            data => {
                this.detail = data;
                // console.log(this.detail.properties);
            },
            error => {
                console.error("Not element!");
                return Observable.throw(error);
            }
        );
    }

    private goBack() {
        this.router.navigate(['/element']);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
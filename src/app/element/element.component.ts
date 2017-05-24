import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ElementService} from './element.service';
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
    listdata: any = [];

    constructor(private ElementService: ElementService, private router: Router) {
    }

    ngOnInit() {
        this.loadElement();
    }

    private loadElement() {
        this.ElementService.getElementData().subscribe(
            data => {
                this.listdata = data;
            },
            error => {
                console.error("Not element!");
                return Observable.throw(error);
            }
        );
    }

    public configElement(id) {
        this.router.navigate(['/element/edit',id]);
    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}

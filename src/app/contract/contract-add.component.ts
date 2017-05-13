import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Rx';

declare let $: any;

@Component({
    selector: 'app-contract-add',
    templateUrl: './contract-add.component.html',
    styleUrls: ['./contract.component.css']
})

export class ContractAddComponent implements OnInit {
    res: any;

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        $.AdminLTE.layout.fix();
    }
}
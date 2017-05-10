import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      $.AdminLTE.layout.fix();
  }
}

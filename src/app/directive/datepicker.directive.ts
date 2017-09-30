import {NgModel, DefaultValueAccessor} from '@angular/forms'
import {
    Directive,
    Renderer,
    ElementRef,
    OnInit
} from '@angular/core';

declare let $: any;

@Directive({
    selector: '[ngModel][date-picker]',
    providers: [NgModel]
})
export class DatePicker extends DefaultValueAccessor implements OnInit {
    private element: ElementRef;

    constructor(element: ElementRef, renderer: Renderer) {
        super(renderer, element);
        this.element = element;
    }

    ngOnInit() {
        $(this.element.nativeElement).datepicker({
            language: 'vi',
            autoclose: true,
            minDate: '-50y',
            maxDate: '+50y',
            changeYear: true,
            changeMonth: false,
            dateFormat: 'dd/mm/yy'
        }).on('changeDate', function (e) {
            let evt = document.createEvent('Event');
            evt.initEvent('input', true, false);
            this.dispatchEvent(evt);
        });
    }
}
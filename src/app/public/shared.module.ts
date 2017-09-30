import {ModuleWithProviders, NgModule} from '@angular/core';
import {DatePicker} from '../directive/datepicker.directive';

@NgModule({
    imports: [],
    declarations: [DatePicker],
    exports: [DatePicker],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

    constructor() {

    }
}

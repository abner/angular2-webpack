
import { Component, Input } from '@angular/core';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';



@Component({
    selector: 'aso-box',
    template: require('./box.html'),
    styles: [require('./box.component.scss')],
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class BoxComponent {
    @Input() title;
    constructor() {}
}

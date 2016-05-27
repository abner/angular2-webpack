
import { Component, Input } from '@angular/core';

@Component({
    selector: 'aso-box',
    template: require('./box.html'),
    styles: [require('./box.component.scss')]
})
export class BoxComponent {
    @Input() title;
    constructor() {}
}

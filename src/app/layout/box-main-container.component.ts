
import { Component, Input } from '@angular/core';

import { BreadcrumbComponent, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
    selector: 'mts-box-main-container',
    template: require('./box-main-container.html'),
    directives: [BreadcrumbComponent],
    styles: [require('./box-main-container.scss')],
    providers: [ BreadcrumbService ]
})
export class BoxMainContainerComponent {
    @Input() title;
    @Input() subTitle;
    constructor() { }
}

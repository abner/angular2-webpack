import {Component} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    selector: 'aso-toolbar',
    directives: [MD_TOOLBAR_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES],
    styles: [require('./toolbar.scss')],
    template:  require('./toolbar.html')
})
export class ToolbarComponent {

}

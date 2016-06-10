import { Component, OnInit } from '@angular/core';
import { BoxComponent } from './../layout/box.component';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import {ToolbarComponent} from '../layout/toolbar.component';
@Component({
  selector: 'aso-home',
  directives: [BoxComponent, ToolbarComponent, MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES],
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}

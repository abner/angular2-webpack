import { Component, OnInit } from '@angular/core';

import { BoxMainContainerComponent } from '../layout';

@Component({
  selector: 'mts-home',
  directives: [ BoxMainContainerComponent ],
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

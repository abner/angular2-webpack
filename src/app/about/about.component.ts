import { Component, OnInit } from '@angular/core';

import { BoxMainContainerComponent } from '../layout';

@Component({
  selector: 'mts-my-about',
  template: require('./about.component.html'),
  styles: [require('./about.component.scss')],
  directives: [
    BoxMainContainerComponent
  ]
})
export class AboutComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello About');
  }

}

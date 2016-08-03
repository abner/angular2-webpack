import { Component, OnInit } from '@angular/core';

import { BoxMainContainerComponent } from '../layout';

import { ROUTER_DIRECTIVES, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'mts-my-about',
  template: require('./about.component.html'),
  styles: [require('./about.component.scss')],
  directives: [
    ...ROUTER_DIRECTIVES, RouterLinkActive,
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

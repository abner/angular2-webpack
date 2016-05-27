import { Component, OnInit } from '@angular/core';
import { BoxComponent } from './../layout/box.component';

@Component({
  selector: 'aso-home',
  directives: [BoxComponent],
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

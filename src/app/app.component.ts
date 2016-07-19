import { Component, ViewChild } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ApiService } from './shared';

import {BoxComponent} from './layout/box.component.ts';
import {ToolbarComponent} from './layout/toolbar.component';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
// import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';

// import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
// import { MdIconRegistry, MD_ICON_DIRECTIVES } from '@angular2-material/icon';
// import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
// import { MD_SIDENAV_DIRECTIVES, MdSidenav } from '@angular2-material/sidenav';
// import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';


import '../style/app.scss';

interface AppPage {
  url: string;
  text: string;
  description: string;
  icon: string;
}
/*
 * App Component
 * Top Level Component
 */

let MATERIAL_DIRECTIVES = [
  MD_BUTTON_DIRECTIVES,
  MD_GRID_LIST_DIRECTIVES,
  MD_ICON_DIRECTIVES,
  MD_LIST_DIRECTIVES,
  MD_SIDENAV_DIRECTIVES,
  MD_TOOLBAR_DIRECTIVES
];

let APP_DIRECTIVES = [
  BoxComponent,
  ToolbarComponent
];
@Component({
  selector: 'aso-app', // <my-app></my-app>
  providers: [MdIconRegistry, ApiService], //MdRadioDispatcher
  directives: [...APP_DIRECTIVES, ...MATERIAL_DIRECTIVES, ...ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent {

  formShowing: boolean = false;
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind"
    },
    {
      name: "Potential dates",
      description: "Find your soulmate!",
      icon: "pets"
    }
  ];

  @ViewChild('sidenav') sidenav: MdSidenav;

  url = 'https://github.com/preboot/angular2-webpack';

  pages: AppPage[] = [
    {
      url: '',
      text: 'Home',
      icon: 'home',
      description: 'Go to the home page'
    },
    {
      url: 'about',
      text: 'About',
      icon: 'info',
      description: 'Go to the about page'
    },
    {
      url: 'gitlab',
      text: 'Gitlab',
      icon: 'group_work',
      description: 'Go to Gitlab config page'
    }
  ];

  constructor(private api: ApiService, private router: Router) {
  }

  navigate(page: AppPage) {
    this.router.navigate([page.url]);
    this.sidenav.close();
  }
}

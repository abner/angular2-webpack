
import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';


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
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import {  BreadcrumbComponent, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { ApiService } from './shared';
import { SidenavItemsListComponent } from './layout';
import { AppMenuItem } from './models';

let MATERIAL_DIRECTIVES = [
  MD_BUTTON_DIRECTIVES,
  MD_GRID_LIST_DIRECTIVES,
  MD_SIDENAV_DIRECTIVES,
  MD_TOOLBAR_DIRECTIVES,
  MD_CARD_DIRECTIVES
];

let APP_DIRECTIVES = [
  SidenavItemsListComponent,
  BreadcrumbComponent
];

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'mts-app', // <my-app></my-app>
  providers: [ApiService, MdIconRegistry, BreadcrumbService],
  directives: [...APP_DIRECTIVES, ...MATERIAL_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent {

  formShowing: boolean = false;

  @ViewChild('sidenav') sidenav: MdSidenav;

  title = 'MyTeam Space';

  url = 'https://github.com/preboot/angular2-webpack';

  pages: AppMenuItem[] = [
    {
      url: '/',
      text: 'Home',
      icon: 'home',
      showInNav: true,
      description: 'Go to the home page'
    },
    {
      url: '/about',
      text: 'About',
      icon: 'info',
      showInNav: true,
      description: 'Go to the about page'
    },
    {
      url: '/gitlab',
      text: 'Gitlab',
      icon: 'group_work',
      showInNav: true,
      description: 'Go to Gitlab config page'
    },
    {
      url: '/gitlab/projects',
      text: 'Gitlab Projects',
      icon: 'team_connect',
      showInNav: false,
      description: 'Go to Gitlab config page'
    }
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    @Inject(BreadcrumbService) breadcrumbService) {
    console.log('MENU ITEMS', this.getMenuItems());
    this.setupBreadcrumb(breadcrumbService);
  }

  getMenuItems(): AppMenuItem[] {
    return this.pages.filter(item => {
      return item.showInNav;
    });
  }

  private setupBreadcrumb(breadcrumbService: BreadcrumbService) {
    this.pages.forEach(page => {
      breadcrumbService.addFriendlyNameForRoute(page.url, page.text);
    });
  }

}

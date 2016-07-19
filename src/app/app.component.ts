import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ApiService } from './shared';

import {BoxComponent} from './layout/box.component.ts';
import {ToolbarComponent} from './layout/toolbar.component';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MdIconRegistry, MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_SIDENAV_DIRECTIVES, MdSidenav } from '@angular2-material/sidenav';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import {  BreadcrumbComponent, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import '../style/app.scss';

interface AppPage {
  url: string;
  text: string;
  description: string;
  icon: string;
  showInNav?: boolean;
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
  BreadcrumbComponent,
  ToolbarComponent
];

@Component({
  selector: 'aso-app', // <my-app></my-app>
  providers: [ApiService, MdIconRegistry, BreadcrumbService],
  directives: [...APP_DIRECTIVES, ...MATERIAL_DIRECTIVES, ...ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MdSidenav;

  url = 'https://github.com/preboot/angular2-webpack';

  pages: AppPage[] = [
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
      icon: 'about',
      showInNav: true,
      description: 'Go to the about page'
    },
    {
      url: '/gitlab',
      text: 'Gitlab',
      icon: 'git',
      showInNav: true,
      description: 'Go to Gitlab config page'
    },
    {
      url: '/gitlab/projects',
      text: 'Gitlab Projects',
      icon: 'git',
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

  getMenuItems() {
    return this.pages.filter(item => {
      return item.showInNav;
    });
  }


  navigate(page: AppPage) {
    this.router.navigate([page.url]);
    this.sidenav.close();
  }

  private setupBreadcrumb(breadcrumbService: BreadcrumbService) {
    this.pages.forEach(page => {
      breadcrumbService.addFriendlyNameForRoute(page.url, page.text);
    });
  }

}

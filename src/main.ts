import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
//// *** HINT not necessary since .beta.3' was used to setup Baratang Chrome Extension Plugin
// import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HTTP_PROVIDERS } from '@angular/http';
import {AppComponent} from './app/app.component';
import { appRouterProviders } from './app/app.routes';

import './style/main.scss';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  // *** HINT not necessary since .beta.3'
  // ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}


import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { GITLAB_BASE_URL } from './app/http/';

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    // These are dependencies of our App
    ...HTTP_PROVIDERS,
    appRouterProviders,
    // ...ROUTER_PROVIDERS,
    ...ENV_PROVIDERS,
    BreadcrumbService,
     // , { provide: LocationStrategy, useClass: HashLocationStrategy } // use #/ routes, remove this for HTML5 mode
     provide(PLATFORM_DIRECTIVES, {useValue: MD_BUTTON_DIRECTIVES, multi: true}),
     provide(PLATFORM_DIRECTIVES, {useValue: MD_CARD_DIRECTIVES, multi: true}),
     provide(PLATFORM_DIRECTIVES, {useValue: MD_ICON_DIRECTIVES, multi: true}),
     provide(PLATFORM_DIRECTIVES, {useValue: MD_LIST_DIRECTIVES, multi: true}),
     provide(PLATFORM_DIRECTIVES, {useValue: MD_INPUT_DIRECTIVES, multi: true}),
     provide(PLATFORM_DIRECTIVES, {useValue: ROUTER_DIRECTIVES, multi: true}),
     provide(GITLAB_BASE_URL, { useValue: 'https://gitlab.com/api/v3' })


  ])
  .catch(err => console.error(err));

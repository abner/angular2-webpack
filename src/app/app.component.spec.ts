import {
  it,
  inject,
  async,
  beforeEachProviders
} from '@angular/core/testing';

// to use Translate Service, we need Http, and to test Http we need to mock the backend
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { provide } from '@angular/core';

import { TestComponentBuilder } from '@angular/compiler/testing';

// Load the implementations that should be tested
import { ApiService } from './shared';
import { AppComponent } from './app.component';


import { appRouterProviders } from './app.routes';

import { APP_BASE_HREF } from '@angular/common';

import { Observable } from 'rxjs/Rx';

import { BoxMainContainerComponent } from './layout';

import { ROUTER_DIRECTIVES, Router, RouterLinkActive, ActivatedRoute } from '@angular/router';

import {  BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

class MockRouter {
  createUrlTree() { }
  navigateByUrl() { }
  navigate() { }
}
let constantObservableConstructor = (params: any) => {
  return Observable.of(1);
}

let mockedActivatedRouteObj = {
  routerState: {
    root: ''
  },
  params: {
    subscribe: constantObservableConstructor
  },
  snapshot: {
    params: {
      id: 1
    }
  }
}

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    appRouterProviders, // must be first
    { provide: APP_BASE_HREF, useValue: '/' }, // must be second
    { provide: ActivatedRoute, useValue: mockedActivatedRouteObj },
    { provide: Router, useClass: MockRouter },

    provide(BreadcrumbService, {useClass: BreadcrumbService}),
    ApiService,
    BaseRequestOptions,
    MockBackend,
    // Provide a mocked (fake) backend for Http
    provide(Http, {
      useFactory: function useFactory(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);


  it('should have an url', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(AppComponent).then((fixture) => {
      fixture.detectChanges();
      expect(fixture.componentInstance.url).toEqual('https://github.com/preboot/angular2-webpack');
    });
  })));

});

import {
  it,
  describe,
  async,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

import { PLATFORM_DIRECTIVES } from '@angular/core';

import { provide } from '@angular/core';

import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { AboutComponent } from './about.component';

import { appRouterProviders } from '../app.routes';

import { APP_BASE_HREF } from '@angular/common';

import { Observable } from 'rxjs/Rx';

class MockRouter {
  createUrlTree() { }
  navigateByUrl() { }
  navigate() { }
  get events() {
    return {
      subscribe: () => { }
    };
  }
}

let constantObservableConstructor = (params: any) => {
  return Observable.of(1);
};

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
};

describe('About Component', () => {

  beforeEachProviders(() => [
    appRouterProviders,
    { provide: APP_BASE_HREF, useValue: '/' }, // must be second
    { provide: ActivatedRoute, useValue: mockedActivatedRouteObj },
    provide(PLATFORM_DIRECTIVES, { useValue: [ROUTER_DIRECTIVES], multi: true }),
    {provide: Router, useClass: MockRouter }
  ]);

  it('should ...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(AboutComponent).then((fixture) => {
      fixture.detectChanges();
    });
  })));

});

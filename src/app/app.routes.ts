import { provideRouter, RouterConfig }  from '@angular/router';

import { AboutComponent } from './about';
import { GitlabDashboardComponent } from './gitlab';
import { HomeComponent } from './home';

const routes: RouterConfig = [
  {
    path: 'gitlab',
    children: [
      {
        path: '',
        component: GitlabDashboardComponent
      },
      {
        path: 'dashboard',
        component: GitlabDashboardComponent
      },
    ]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];

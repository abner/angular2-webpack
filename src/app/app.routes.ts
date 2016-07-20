import { provideRouter, RouterConfig }  from '@angular/router';

import { AboutComponent } from './about';
import { GitlabDashboardComponent, GitlabProjectsListComponent } from './gitlab';
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
      {
        path: 'projects',
        component: GitlabProjectsListComponent
      }
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

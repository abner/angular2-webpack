import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxMainContainerComponent } from '../layout';

import { AddGitlabRepositoryComponent } from './add-gitlab-repository.component';
@Component({
    selector: 'mts-gitlab-dashboard',
    template: require('./dashboard.html'),
    directives: [AddGitlabRepositoryComponent, BoxMainContainerComponent]
})
export class GitlabDashboardComponent {
    constructor(route: ActivatedRoute) {
        console.log('Current ROUTE', route.snapshot);
    }
}

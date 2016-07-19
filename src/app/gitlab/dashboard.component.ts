import { Component } from '@angular/core';
import { BoxMainContainerComponent } from '../layout';
@Component({
    selector: 'mts-gitlab-dashboard',
    template: require('./dashboard.html'),
    directives: [BoxMainContainerComponent]
})
export class GitlabDashboardComponent {
    constructor() {

    }
}

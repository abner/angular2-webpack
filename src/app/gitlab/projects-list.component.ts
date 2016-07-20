import { Component } from '@angular/core';

import { BoxMainContainerComponent } from '../layout';

@Component({
    selector: 'mts-gitlab-projects',
    template: require('./projects-list.html'),
    directives: [BoxMainContainerComponent]
})
export class GitlabProjectsListComponent {

    constructor() {

    }
}

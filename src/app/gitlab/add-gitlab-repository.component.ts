import {Component, Inject, Directive, Host} from '@angular/core';
import {
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS,
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    Validators,
    FormControl
} from '@angular/forms';

import { GitlabProjectsRestClient } from '../http/gitlab-projects-rest-client';
import { GitlabRepositoryAsyncValidator } from './gitlab-repository-async-validator';

/**
 * REFERENCES:
 *  http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
 *  http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
 *  http://blog.ng-book.com/the-ultimate-guide-to-forms-in-angular-2/
 */
@Component({
    selector: 'mts-add-gitlab-repository',
    template: require('./add-gitlab-repository.html'),
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        FORM_DIRECTIVES,
    ],
    providers: [GitlabProjectsRestClient, GitlabRepositoryAsyncValidator]
    /*,
    providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useFactory: (restClient) => {
        return GitlabRepositoryAsyncValidator.checkRepositoryExistsByName(restClient);
      },
      deps: [GitlabProjectsRestClient],
      multi: true
    }
  ]*/
})
export class AddGitlabRepositoryComponent {

    public nameControl: FormControl;

    constructor(
        @Inject(GitlabRepositoryAsyncValidator) gitlabRepositoryAsyncValidator: GitlabRepositoryAsyncValidator,
        @Inject(GitlabProjectsRestClient) private restClient: GitlabProjectsRestClient
    ) {

        this.nameControl = new FormControl('',
                            Validators.composeAsync([
                                    <any>gitlabRepositoryAsyncValidator.checkRepositoryExistsByName
                                ]));
    }

    checkRepository(target: any) {
        console.log('Asked for check repository!', target, this.nameControl);
    }
}

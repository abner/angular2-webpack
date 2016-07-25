import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';

import { GitlabProjectsRestClient } from '../http/gitlab-projects-rest-client';
import { Project } from '../http/gitlab-projects-rest-client';
@Injectable()
export class GitlabRepositoryAsyncValidator {
    private input = new ReplaySubject<string>();
    private request: any;

    // does not work, call the server multiple times -> DO NOT USE YET 
    constructor( @Inject(GitlabProjectsRestClient) private restClient: GitlabProjectsRestClient) {
        this.input = new ReplaySubject<string>(1);

        this.request = this.input
            .debounceTime(1000)
            .distinctUntilChanged()
            .take(1)
            .switchMap(input => restClient.findProjectByName(input))
            .share()
            .catch(() => Observable.of(null));

    }
    checkRepositoryExistsByName = (control: AbstractControl): AsyncValidatorFn => {
        this.input.next(control.value);
        return this.request;
    };


}

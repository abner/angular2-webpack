import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';

import { GitlabProjectsRestClient } from '../http/gitlab-projects-rest-client';
import { Project } from '../http/gitlab-projects-rest-client';
@Injectable()
export class GitlabRepositoryAsyncValidator {
    private input = new ReplaySubject<string>();
    private request: any;
    constructor( @Inject(GitlabProjectsRestClient) private restClient: GitlabProjectsRestClient) {
        this.input = new ReplaySubject<string>(1);

        this.request = this.input
            .debounceTime(450)
            .distinctUntilChanged()
            .map(x => x)
            .switchMap(value => value)
            //subscribe and so call the http client to see if it will work
            .do(value => { console.log('HERE', value);if(value[0] && value[0] !== '' ) { return restClient.findProjectByName(value[0]) } })
            .map(r => r)
            .catch(() => Observable.of(null));
    }
    checkRepositoryExistsByName = (control: AbstractControl): AsyncValidatorFn  => {

        // let observable: any = Observable.create((observer: Observer<any>) => {
        //     control
        //         .valueChanges.filter(f => f.length > 3)
        //         .debounceTime(2000)
        //         .flatMap(value => restClient.findProjectByName(value))
        //         .subscribe(
        //         projects => {
        //             observer.next(null);
        //             observer.complete();
        //         },
        //         error => {
        //             observer.next({
        //                 ['repositoryNotExists']: true
        //             });
        //             observer.complete();
        //         }
        //         );
        // });
        this.input.next(control.value);
        return this.request;
    };


}

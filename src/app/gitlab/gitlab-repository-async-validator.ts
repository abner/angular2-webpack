import { AbstractControl } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';

import { GitlabProjectsRestClient } from '../http/gitlab-projects-rest-client';

export class GitlabRepositoryAsyncValidator {

    static checkRepositoryExistsByName(restClient: GitlabProjectsRestClient): AsyncValidatorFn  {
        return <any>((control: AbstractControl)  => {
            let observable: any = Observable.create((observer: Observer<any>) => {
                control
                    .valueChanges
                    .flatMap(value => restClient.findProjectByName(value))
                    .subscribe(
                    projects => {
                        observer.next(null);
                        observer.complete();
                    },
                    error => {
                        observer.next({
                            ['repositoryNotExists']: true
                        });
                        observer.complete();
                    }
                    );
            });
            return observable;
        });

    }
}

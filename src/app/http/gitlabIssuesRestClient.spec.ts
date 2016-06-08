let env = process.env;

import {provide} from '@angular/core';
import {inject, beforeEach, beforeEachProviders} from '@angular/core/testing';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {Issue, GitlabIssuesRestClient} from './gitlabIssuesRestClient';

describe('gitlabIssuesRestClient', () => {

    let gitlabRestClient: GitlabIssuesRestClient;
    let httpService: Http;
    const PROJECT_ID = 230;

    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        provide('GitlabBaseUrl', { useValue: env.gitlabConfig.url }),
        GitlabIssuesRestClient
    ]);

    beforeEach(inject([Http, GitlabIssuesRestClient], (http: Http, _gitlabRestClient: GitlabIssuesRestClient) => {
        gitlabRestClient = _gitlabRestClient;
        gitlabRestClient.addHeader('Private-Token', env.gitlabConfig.apiToken);
        httpService = http;
    }));

    it('returns gitlab issues from gitlab api', done => {
        gitlabRestClient.getIssues(PROJECT_ID).subscribe((result: Issue[]) => {
            expect(result.length > 0).toBeTruthy();
            done();
        }, error => {
            console.error(error);
            fail(`Error getting issues for project : ${PROJECT_ID} => ` + error.body);
        });

    });
})

import {provide} from '@angular/core';
import {inject, beforeEach, beforeEachProviders} from '@angular/core/testing';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {GitlabProjectsRestClient} from './gitlab-projects-rest-client';

import { GitlabEnvironmentConfig }  from '../models';

let gitlabEnvConfig: GitlabEnvironmentConfig = process.env.gitlabConfig;

describe('GitlabProjectsRestClient', () => {

    let gitlabRestClient: GitlabProjectsRestClient;
    let httpService: Http;

    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        provide('GitlabBaseUrl', { useValue: gitlabEnvConfig.test.defaultUrl }),
        GitlabProjectsRestClient
    ]);

    beforeEach(inject([Http, GitlabProjectsRestClient], (http: Http, _gitlabRestClient: GitlabProjectsRestClient) => {
        gitlabRestClient = _gitlabRestClient;
        gitlabRestClient.addHeader('Private-Token', gitlabEnvConfig.test.apiToken);
        httpService = http;
    }));

    // it('creates a new project on gitlab', (done) => {
    //     gitlabRestClient.addProject(<Project>{ name: 'new Project' })
    //         .subscribe(result => {
    //             expect(result).toBeDefined();
    //             expect(result.name).toEqual('new Project');
    //             done();
    //         }, (error => fail('Error adding a new project: ' + error.json())));
    // });

    it('returns a project searching by name', (done) => {
        gitlabRestClient.findProjectByName(gitlabEnvConfig.test.project.name)
            .subscribe(result => {
                expect(result).toBeDefined();
                expect(result[0].name).toEqual(gitlabEnvConfig.test.project.name);
                done();
            }, (error => fail('Error returning a specific project by name: ' + error.json())));
    });

    it('returns a specific Project from Gitlab', (done) => {
        gitlabRestClient.findProject(gitlabEnvConfig.test.project.id)
            .subscribe(result => {
                expect(result).toBeDefined();
                expect(result.name).toEqual(gitlabEnvConfig.test.project.name);
                done();
            }, (error => fail('Error returning a specific project: ' + error.json())));
    });

    it('returns gitlab projects from gitlab api', done => {
        gitlabRestClient.projects().subscribe(result => {
            expect(result.length > 0).toBeTruthy();
            done();
        }, (error => fail('Error getting projects: ' + error.json())));

    });
});

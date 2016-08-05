import {provide, Injector, ReflectiveInjector} from '@angular/core';
import {
    describe,
    expect,
    beforeEach,
    it,
    async,
    inject,
    beforeEachProviders
} from '@angular/core/testing';

import {HTTP_PROVIDERS, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions} from '@angular/http';
import { MockBackend, MockConnection, } from '@angular/http/testing';
import {Issue, GitlabIssuesRestClient} from './gitlab-issues-rest-client';

import { GitlabEnvironmentConfig }  from '../models';

let gitlabEnvConfig: GitlabEnvironmentConfig = process.env.gitlabConfig;

import { GITLAB_PRIVATE_TOKEN, GITLAB_BASE_URL } from './';

describe('gitlabIssuesRestClient', () => {

    let gitlabRestClient: GitlabIssuesRestClient;
    let httpService: Http;
    const PROJECT_ID = 1146463;

    interface MockedHttpResult {
        http: Http;
        connection: MockConnection;
    }

    function getMockedHttp(): any[] {
        let injector: Injector = ReflectiveInjector.resolveAndCreate([
            MockBackend,
            provide(GITLAB_PRIVATE_TOKEN, { useValue: gitlabEnvConfig.test.apiToken }),
            BaseRequestOptions,
            provide(Http, {
                useFactory: (backend, options) => {
                    return new Http(backend, options);
                }, deps: [MockBackend, BaseRequestOptions]
            })]);
        let backend: MockBackend = injector.get(MockBackend);
        let http: Http = injector.get(Http);
        return [http, backend];
    }

    it('use a mockedHttp', () => {
        let http: Http, backend: MockBackend;
        [http, backend] = getMockedHttp();
        let httpBodyResponded: string;

        backend.connections.subscribe((connection: MockConnection) => {
            http.get('http://blaserver.com').subscribe(res => httpBodyResponded = res.text());
            connection.mockRespond(new Response(new ResponseOptions({ body: 'Bla', status: 200 })));
            expect(httpBodyResponded).toEqual('Bla');
        });
    });

    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        provide(GITLAB_PRIVATE_TOKEN, { useValue: gitlabEnvConfig.test.apiToken }),
        provide(GITLAB_BASE_URL, { useValue: gitlabEnvConfig.test.defaultUrl }),
        provide(XHRBackend, { useClass: MockBackend }),
        GitlabIssuesRestClient
    ]);

    beforeEach(inject([Http, GitlabIssuesRestClient], (http: Http, _gitlabRestClient: GitlabIssuesRestClient) => {
        gitlabRestClient = _gitlabRestClient;
        // gitlabRestClient.addHeader('Private-Token', gitlabEnvConfig.test.apiToken);
        httpService = http;
    }));

    it('returns gitlab issues from gitlab api',
        async(inject([XHRBackend, GitlabIssuesRestClient], (mockBackend: MockBackend, gitlabIssuesRestClient) => {
            return new Promise((pass, fail) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions(
                            {
                                body: [1]
                            }
                        )
                    ));
                });
                gitlabIssuesRestClient.getIssues(PROJECT_ID).subscribe((result: Issue[]) => {
                    expect(result.length > 0).toBeTruthy();
                }, error => {
                    console.error(error);
                    fail(`Error getting issues for project : ${PROJECT_ID} => ` + error.body);
                });
            });


        })
    ));

    it('returns gitlab issues from gitlab api 2',
        async(inject([XHRBackend, GitlabIssuesRestClient], (mockBackend: MockBackend, gitlabIssuesRestClient) => {
            return new Promise((pass, fail) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions(
                            {
                                status: 501,
                                statusText: 'Error',
                                body: [1]
                            }
                        )
                    ));
                });
                gitlabIssuesRestClient.getIssues(PROJECT_ID).subscribe((result: Issue[]) => {
                    expect(result.length > 0).toBeTruthy();
                }, error => {
                    console.error(error);
                    fail(`Error getting issues for project : ${PROJECT_ID} => ` + error.body);
                });
            });
        }))
    );

    it('handles errors when getting  issues from gitlab api',
        async(inject([XHRBackend, GitlabIssuesRestClient], (mockBackend: MockBackend, gitlabIssuesRestClient) => {
            return new Promise((pass, fail) => {
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockError(new Error('fail getting data from api'));
                });
                gitlabIssuesRestClient.getIssues(PROJECT_ID).subscribe((result: Issue[]) => {
                    fail('An error was expected');
                }, error => {
                    expect(error.message).toEqual('fail getting data from api');
                });
            });


        }))
    );
});

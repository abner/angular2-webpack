import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {RestBase} from './restBase.service';
import {GET, POST,  DELETE,  Path, Body, Produces, MediaType} from './decorators';
import {Observable} from 'rxjs';

export interface Issue {
    id: number;
    name: string;
}

@Injectable()
export class GitlabIssuesRestClient extends RestBase<Issue> {

    constructor( @Inject(Http) http: Http, @Inject('GitlabBaseUrl') baseUrl: string) {
        super(http, baseUrl);
    }

    @GET('/projects/{projectId}/issues')
    @Produces(MediaType.JSON)
    getIssues (@Path('projectId') projectId: number): Observable<Issue[]> { return null; }

    @GET('/projects/{projectId}/issues/{id}')
    @Produces(MediaType.JSON)
    getIssue (@Path('id') id: number): Observable<Issue> { return null; }

    @GET('/projects/${projectId}/search/{name}')
    @Produces(MediaType.JSON)
    searchIssues(@Path('projectId') projectId: string, @Path('name') name: string): Observable<Issue[]> { return null; }

    @POST('/projects/{projectId}/issues')
    @Produces(MediaType.JSON)
    addProject(@Body issue: Issue): Observable<Issue> { return null; }

    @POST('/projects/{projectId}/issues/{id}')
    @Produces(MediaType.JSON)
    updateProject(@Body issue: Issue): Observable<Issue> { return null; }

    @DELETE('/projects/${projectId}/issues/{id}')
    public deleteById( @Path('projectId')projectId: number, @Path('id') id: number): void { return null; };
}

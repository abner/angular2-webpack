import {Inject, Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {RestResult} from './restResult.model';

@Injectable()
export abstract class RestBase<T> {
    @Inject(Http) private http: Http;
    private headers: Headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(private baseUrl: string) {
    }

    protected getDefaultHeaders(): Headers {
        return this.headers;
    };

    /**
     * Abstract getPath() method is used to mount the url 
     * on REST Operations
     * @protected
     * @abstract
     * @returns {string} The path of the REST endpoint
     */
    public abstract getResourcePath(): string;

    /**
     * Abstract getDataKeys()
     * 
     * Should be implemented into the child classes and 
     * returns the singular and plural names of the represented resource
     * 
     * @protected
     * @abstract
     * @returns {{ singular: string, plural: string }} (description)
     */
    protected abstract getDataKeys(): { singular: string, plural: string };

    protected extractData(response: Response): RestResult<T> {
        let dataKey: string;
        if (response.json && this.getDataKeys()) {
            if ((<Object>response.json).hasOwnProperty(this.getDataKeys().singular)) {
                dataKey = this.getDataKeys().singular;
            } else if ((<Object>response.json).hasOwnProperty(this.getDataKeys().plural)) {
                dataKey = this.getDataKeys().plural;
            }
        }
        return {
            data: response.json[dataKey],
            headers: response.headers
        };
    };

    protected buildResult(response: Response): RestResult<T> {
        return {
            data: response.json(),
            headers: response.headers
        };
    };

    mapResult(response: Response): RestResult<T> {
        return this.buildResult(response);
    }

    handleError(errorResponse: Response) {
        console.error('ERROR', errorResponse);
        // TODO check if errorResponse has or not some json payload
        return Observable.throw(errorResponse.json().error);
    }

    getList(): Observable<RestResult<T>> {
        return this.http
            .get(this.getResourcePath())
            .map(this.mapResult)
            .catch(this.handleError);
    }

    getSingle(id: any): Observable<RestResult<T>> {
        return this.http
            .get(this.getResourcePath() + '/' + id.toString())
            .map(this.mapResult)
            .catch(this.handleError);
    }

    delete(obj: T) {

    }

    post(obj: T) {

    }

    update(obj: T) {

    }
}
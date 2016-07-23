import {Injectable} from '@angular/core';
import {Http, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs';


@Injectable()
export abstract class RestBase<T> {
    protected headers: Headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(protected http: Http, private baseUrl: string) {
    }

    addHeader(name: string, value: string) {
        this.headers.append(name, value);
    }

    protected getDefaultHeaders(): Headers {
        return this.headers;
    };

    getBaseUrl() {
        return this.baseUrl;
    }

    /**
    * Request Interceptor
    *
    * @method requestInterceptor
    * @param {Request} req - request object
    */
    protected requestInterceptor(req: Request) {
        //
    }

    /**
    * Response Interceptor
    *
    * @method responseInterceptor
    * @param {Response} res - response object
    * @returns {Response} res - transformed response object
    */
    protected responseInterceptor(res: Observable<any>): Observable<any> {
        return res;
    }

    // /**
    //  * Abstract getPath() method is used to mount the url 
    //  * on REST Operations
    //  * @protected
    //  * @abstract
    //  * @returns {string} The path of the REST endpoint
    //  */
    // // public abstract getResourcePath(): string;

    // /**
    //  * Abstract getDataKeys()
    //  * 
    //  * Should be implemented into the child classes and 
    //  * returns the singular and plural names of the represented resource
    //  * 
    //  * @protected
    //  * @abstract
    //  * @returns {{ singular: string, plural: string }} (description)
    //  */
    // protected abstract getDataKeys(): { singular: string, plural: string };

    // protected extractData(response: Response): RestResult<T> {
    //     let dataKey: string;
    //     if (response.json && this.getDataKeys()) {
    //         if ((<Object>response.json).hasOwnProperty(this.getDataKeys().singular)) {
    //             dataKey = this.getDataKeys().singular;
    //         } else if ((<Object>response.json).hasOwnProperty(this.getDataKeys().plural)) {
    //             dataKey = this.getDataKeys().plural;
    //         }
    //     }
    //     return {
    //         data: response.json[dataKey],
    //         headers: response.headers
    //     };
    // };

    // protected buildResult(response: Response): RestResult<T> {
    //     return {
    //         data: response.json(),
    //         headers: response.headers
    //     };
    // };

    // mapResult(response: Response): RestResult<T> {
    //     return this.buildResult(response);
    // }

    // handleError(errorResponse: Response) {
    //     console.error('ERROR', errorResponse);
    //     // TODO check if errorResponse has or not some json payload
    //     return Observable.throw(errorResponse.json().error);
    // }
}

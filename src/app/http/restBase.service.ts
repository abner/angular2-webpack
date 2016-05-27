import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {RestResult} from './restResult.model';

@Injectable()
export class RestBase<T> {
    @Inject(Http) private http: Http;
    constructor() {

    }

    get(): Observable<RestResult<T>> {
        return Observable.of(<RestResult<T>>{ data: null });
    }

    delete(obj: T) {
        this.http.delete("/").map(response => response.)
    }

    post(obj: T) {

    }

    update(obj: T) {

    }
}
import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from './http-client';

@Injectable()
export class AppService {
    private apiUrl = './api';  // URL to web api

    constructor(private http: HttpClient) {
    }

    getMenu(): any {
        const url = this.apiUrl + `/menu`;
        return this.http.get(url).map((res: Response) => res.json().data);
    }
}
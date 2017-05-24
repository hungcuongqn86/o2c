import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '../http-client';

@Injectable()
export class ElementService {
    private apiUrl = './api';  // URL to web api
    private module = 'element';

    constructor(private http: HttpClient) {
    }

    getElementData() {
        let url = this.apiUrl + '/' + this.module + `/config`;
        return this.http.get(url).map((res: Response) => res.json().data);
    }
}

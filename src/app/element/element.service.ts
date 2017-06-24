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

    getSingle(id: string) {
        let url = this.apiUrl + '/' + this.module + `/getSingle`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getSingleElement(id: string) {
        let url = this.apiUrl + '/' + this.module + `/getSingleElement`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    saveRecord(list: any) {
        let url = this.apiUrl + '/' + this.module + `/saveRecord`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify(list);
        return this.http.post(url, body, headers).map((res: Response) => res.json());
    }
}

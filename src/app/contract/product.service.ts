import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '../http-client';

@Injectable()
export class productService {
    private apiUrl = './api';  // URL to web api
    private module = 'product';

    constructor(private http: HttpClient) {
    }

    getProducttypesData(): any {
        let url = this.apiUrl + `/producttype/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', '1');
        params.set('limit', '100');
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getListData(): any {
        const url = this.apiUrl + `/list/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', '1');
        params.set('limit', '10000');
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }
}
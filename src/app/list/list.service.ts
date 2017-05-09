import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '../http-client';

@Injectable()
export class ListService {
    private apiUrl = './api';  // URL to web api
    private module = 'list';

    constructor(private http: HttpClient) {
    }

    getListType(): any {
        const url = this.apiUrl + `/listtype`;
        return this.http.get(url).map((res: Response) => res.json().data);
    }

    getListData(): any {
        const url = this.apiUrl + '/' + this.module + `/getAll`;
        return this.http.get(url).map((res: Response) => res.json().data);
    }
}
import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '../http-client';

@Injectable()
export class userService {
    private apiUrl = './api';  // URL to web api
    private module = 'user';

    constructor(private http: HttpClient) {
    }

    getRoles(){
        let url = this.apiUrl + `/roles`;
        return this.http.get(url).map((res: Response) => res.json().data);
    }

    getUsersData(searchparam: any): any {
        const url = this.apiUrl + '/' + this.module + `/getAll`;
        let params: URLSearchParams = new URLSearchParams();

        let arr = Object.keys(searchparam).map((key)=> {
            params.set(key, searchparam[key]);
        });
        return this.http.get(url,{search: params}).map((res: Response) => res.json().data);
    }
}
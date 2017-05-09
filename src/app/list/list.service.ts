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

    getListData(searchparam: any): any {
        const url = this.apiUrl + '/' + this.module + `/getAll`;
        let params: URLSearchParams = new URLSearchParams();

        let arr = Object.keys(searchparam).map((key)=> {
            params.set(key, searchparam[key]);
        });
        return this.http.get(url,{search: params}).map((res: Response) => res.json().data);
    }

    getList(id:string){
        let url = this.apiUrl + '/' + this.module + `/getSingle`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    saveList(list: any) {
        let url = this.apiUrl + '/' + this.module + `/saveList`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify(list);
        return this.http.post(url, body, headers).map((res: Response) => res.json());
    }

    deleteList(id:string){
        let url = this.apiUrl + '/' + this.module + `/delete/`+id;
        return this.http.delete(url).map((res: Response) => res.json());
    }
}
import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '../http-client';

@Injectable()
export class contractService {
    private apiUrl = './api';  // URL to web api
    private module = 'contract';

    constructor(private http: HttpClient) {
    }

    getContractsData(searchparam: any): any {
        let url = this.apiUrl + '/' + this.module + `/getAll`;
        let params: URLSearchParams = new URLSearchParams();

        let arr = Object.keys(searchparam).map((key) => {
            params.set(key, searchparam[key]);
        });
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getSingle(id: string) {
        let url = this.apiUrl + '/' + this.module + `/getSingle`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getProduct(id: string) {
        let url = this.apiUrl + `/product/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('contract_id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    saveRecord(list: any) {
        let url = this.apiUrl + '/' + this.module + `/saveRecord`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify(list);
        return this.http.post(url, body, headers).map((res: Response) => res.json());
    }

    deleteRecord(idlist: string) {
        let url = this.apiUrl + '/' + this.module + `/delete/` + idlist;
        return this.http.delete(url).map((res: Response) => res.json());
    }

    deleteProd(idlist: string) {
        let url = this.apiUrl + `/product/delete/` + idlist;
        return this.http.delete(url).map((res: Response) => res.json());
    }

    getCustomersData(): any {
        let url = this.apiUrl + `/customer/getAll`;
        return this.http.get(url).map((res: Response) => res.json().data);
    }

    getListData(): any {
        const url = this.apiUrl + `/list/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', '1');
        params.set('limit', '10000');
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }
}
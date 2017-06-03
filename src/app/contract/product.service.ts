import {Injectable} from '@angular/core';
import {URLSearchParams, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '../http-client';

@Injectable()
export class cmdEl {
    public id;
    public name = '';
    public so_trang = '';
    public kho_tp = '';

    constructor() {
    }
}

@Injectable()
export class productService {
    private apiUrl = './api';  // URL to web api
    private module = 'product';

    constructor(private http: HttpClient) {
    }

    getProduct(id: string) {
        let url = this.apiUrl + `/product/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('contract_id', id);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }


    getProducttypesData(): any {
        let url = this.apiUrl + `/producttype/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', '1');
        params.set('limit', '100');
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getProducttype(code) {
        let url = this.apiUrl + `/producttype/getSingleByCode`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('code', code);
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getListData(): any {
        const url = this.apiUrl + `/list/getAll`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', '1');
        params.set('limit', '10000');
        return this.http.get(url, {search: params}).map((res: Response) => res.json().data);
    }

    getSingle(id: string) {
        let url = this.apiUrl + '/' + this.module + `/getSingle`;
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
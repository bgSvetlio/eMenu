import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) { }

    getMenu () {
        // return this.http.get('http://localhost:8080/api/Menu/check');
        return this.http.get('http://localhost:8080/api/Menu/show?date=2018-4-30');
    }

    getCreateMenu () {
        // return this.http.get('http://localhost:8080/api/Menu/check');
        return this.http.get('http://localhost:8080/api/menu');
    }

}

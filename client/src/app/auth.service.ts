import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private jwtHelper: JwtHelper ) { }

    login(username: string, password: string ) {
        return this.http.post('http://localhost:8080/api/login', {username, password});
    }

    public isAuthenticated(): boolean {

        const token = localStorage.getItem('access_token');

        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }
}

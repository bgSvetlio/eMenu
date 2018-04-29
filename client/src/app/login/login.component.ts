import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    form: FormGroup;
    errMsg: String;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {

        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.form.value;

        if (val.username && val.password) {
            this.authService.login(val.username, val.password).catch((err) => {
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    this.errMsg = "Wrong username or password";
                } else {
                    this.errMsg = err.message || "Server Error"
                }

                // Do messaging and error handling here
                return Observable.throw(err)
            }).subscribe(
                (data: any) => {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('role', data.roles);

                    if(data.roles.includes("ROLE_COMPANY")) {
                        this.router.navigateByUrl('/menu');
                    } else if(data.roles.includes("ROLE_RESTAURANT")) {
                        this.router.navigateByUrl('/menuCreate');
                    }
                }
            );
        }
    }
}

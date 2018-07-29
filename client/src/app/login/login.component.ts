import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {HttpErrorResponse} from "@angular/common/http";
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    form: FormGroup;
    regForm: FormGroup;
    msg: String;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {

        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.regForm = this.fb.group({
            comapnyName: ['', Validators.required],
            secretKeyWord: ['', Validators.required],
            username: ['', Validators.required],
            eMail: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login() {
        const val = this.form.value;

        if (val.username && val.password) {
            this.authService.login(val.username, val.password).catch((err) => {
                $("#message").css('color', 'red');
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    this.msg = "Wrong username or password";
                } else {
                    this.msg = err.message || "Server Error"
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

    toggleLoginRegForm() {
        this.msg = "";
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    }

    register() {
        console.log("gfhgf");
        const val = this.regForm.value;

        this.authService.registerUser(val.comapnyName, val.secretKeyWord, val.username, val.eMail, val.password).catch((err) => {
            $("#message").css('color', 'red');
            if (err.status == 400) {
                this.msg = err.error;
            } else {
                this.msg = err.message || "Server Error"
            }

            // Do messaging and error handling here
            return Observable.throw(err)
        }).subscribe(
            (data: any) => {
                this.toggleLoginRegForm();
                $("#message").css('color', 'green');
                this.msg = "Registered successfully! Please login."
            }
        );
    }
}

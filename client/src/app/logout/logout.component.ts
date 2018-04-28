import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");

        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
    }

}

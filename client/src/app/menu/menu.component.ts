import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpErrorResponse} from "@angular/common/http";
import {MenuService} from "../menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    menu: any;
    errMsg: String;

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.getMenu();
    }

    getMenu() {
        this.menuService.getMenu().catch((err) => {

            if (err instanceof HttpErrorResponse && err.status == 403) {
                this.errMsg = "Forbidden resource";
            } else {
                this.errMsg = err.message || "Server Error"
            }

            // Do messaging and error handling here
            return Observable.throw(err);
        }).subscribe(
            (data: any) => {
                console.log('aaaaaaaaa');
                console.log(data);

                this.menu = data;
                console.log('aaaaaaaaa');
            }
        );
    }

}

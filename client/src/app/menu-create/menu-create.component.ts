import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {MenuService} from "../menu.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenuCreateComponent implements OnInit {

    menus: any;
    errMsg: String;

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.getMenu();
    }

    getMenu() {
        this.menuService.getCreateMenu().catch((err) => {

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

                this.menus = [data];
            }
        );
    }

}

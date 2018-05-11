import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {MenuService} from "../menu.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Menu} from "../domainObjects/menu";
import {Dish} from "../domainObjects/dish";

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenuCreateComponent implements OnInit {

    menu: Menu;
    errMsg: String;
    orderMsg: String;
    date: Date = new Date();

    selectedDishes: Dish[] = [];

    orderPrice: number = 0;

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.getMenu();
    }

    getMenu() {
        this.menuService.getMenuForADate(this.date).catch((err) => {

            if (err instanceof HttpErrorResponse && err.status == 403) {
                this.errMsg = "Forbidden resource";
            } else if(err.status == 400 && err.error == "menuNotFound") {
                this.errMsg = "Menu for this date is not found";
            } else {
                this.errMsg = err.message || "Server Error";
            }
            // Do messaging and error handling here
            return Observable.throw(err);
        }).subscribe(
            (data: Menu) => {
                console.log(data);
                this.errMsg = null;
                this.orderMsg = null;
                this.selectedDishes = [];
                this.orderPrice = 0;

                this.menu = data;
            }
        );
    }

}

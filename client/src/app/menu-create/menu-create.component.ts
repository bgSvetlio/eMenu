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

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.getMenu();
    }

    getMenu() {
        this.menuService.getMenuForADate(this.date).catch((err) => {

            if (err instanceof HttpErrorResponse && err.status == 403) {
                this.errMsg = "Forbidden resource";
            } else if(err.status == 400 && err.error == "menuNotFound") {
                this.menu = new Menu(null, null);
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

                this.menu = data;
            }
        );
    }

    addDish() {
        let dish: Dish = null;

        if(this.menu.dishes == null) {
            this.menu.date = this.date;
            this.menu.dishes = [];
            this.errMsg = null;

            dish = new Dish(1);
        } else {
            dish = new Dish(Math.max.apply(Math, this.menu.dishes.map(function (dish) {
                return dish.id;
            })) + 1);
        }
        this.menu.dishes.push(dish);
    }

    saveMenu() {
        this.menuService.saveMenu(this.menu).catch((err) => {

            if (err instanceof HttpErrorResponse && err.status == 403) {
                this.errMsg = "Forbidden resource";
            } else {
                this.errMsg = err.message || "Server Error";
            }

            // Do messaging and error handling here
            return Observable.throw(err);
        }).subscribe(
            (data: any) => {
                console.log(data);
                this.errMsg = null;
                this.orderMsg = null;

                this.menu = data;
            }
        );
    }

    updateDish(updatedDish: Dish) {
        let index = this.menu.dishes.indexOf(this.menu.dishes.find(x => x.id == updatedDish.id));

        this.menu.dishes[index] = updatedDish;
    }

}

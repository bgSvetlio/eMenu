import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpErrorResponse} from "@angular/common/http";
import {MenuService} from "../menu.service";
import {Menu} from "../domainObjects/menu";
import {Dish} from "../domainObjects/dish";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

    selectDish(selectedDish: Dish) {
        if(selectedDish.checked) {
            this.selectedDishes.push(selectedDish);
            this.orderPrice += selectedDish.price;
        } else {
            let indexForRemove = this.selectedDishes.findIndex(x => x.id == selectedDish.id)
            if (indexForRemove > -1) {
                this.selectedDishes.splice(indexForRemove,1)
                this.orderPrice -= selectedDish.price;
            }
        }
    }

    saveOrder() {
        this.menuService.submitOrder(this.selectedDishes, this.menu).catch((err) => {

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

                this.orderMsg = `You successfully ordered food for ${new DatePipe('en-US').transform(this.date, 'dd/MM/yyyy')} with ID of the order ${data.id}`;
            }
        );
    }
}

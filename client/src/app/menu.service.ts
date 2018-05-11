import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dish} from "./domainObjects/dish";
import {Menu} from "./domainObjects/menu";

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) { }

    getMenu () {
        return this.http.get('http://localhost:8080/api/Menu/show?date=2018-4-30');
    }

    getMenuForADate (date: Date) {
        return this.http.get(`http://localhost:8080/api/Menu/show?date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    }

    getCreateMenu () {
        return this.http.get('http://localhost:8080/api/menu');
    }

    submitOrder(selectedDishes: Dish[], menu: Menu) {
        return this.http.post('http://localhost:8080/api/Order/save', {selectedDishes, menu});
    }
}

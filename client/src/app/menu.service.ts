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
        let year = date.getFullYear();
        let month = date.getMonth().toString(10).length === 1 ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate().toString(10).length === 1 ? "0" + date.getDate() : date.getDate();

        return this.http.get(`http://localhost:8080/api/Menu/show?date=${year}-${month}-${day}`);
    }

    getCreateMenu () {
        return this.http.get('http://localhost:8080/api/menu');
    }

    submitOrder(selectedDishes: Dish[], menu: Menu) {
        return this.http.post('http://localhost:8080/api/Order/save', {selectedDishes, menu});
    }

    saveMenu(menu: Menu) {
        return this.http.post('http://localhost:8080/api/Menu/save', {menu});
    }

    postFile(fileToUpload: File) {
        const endpoint = 'http://localhost:8080/api/Menu/saveDishPic';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData);
    }
}

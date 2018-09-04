import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrdersService {

  constructor(private http: HttpClient) { }

    getAllCompanyOrdersForDay (date: Date) {
        let year = date.getFullYear();
        let month = date.getMonth().toString(10).length === 1 ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate().toString(10).length === 1 ? "0" + date.getDate() : date.getDate();

        return this.http.get(`http://localhost:8080/api/Order/getCompanyOrdersForDay?date=${year}-${month}-${day}`);
    }

    getAllOrdersForAllCompaniesForDay(date: Date) {
        let year = date.getFullYear();
        let month = date.getMonth().toString(10).length === 1 ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate().toString(10).length === 1 ? "0" + date.getDate() : date.getDate();

        return this.http.get(`http://localhost:8080/api/Order/getOrdersForDayForAllCompanies?date=${year}-${month}-${day}`);
    }
}

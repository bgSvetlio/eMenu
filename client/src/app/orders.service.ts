import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrdersService {

  constructor(private http: HttpClient) { }

    getAllCompanyOrdersForDay (date: Date) {
        return this.http.get(`http://localhost:8080/api/Order/getCompanyOrdersForDay?date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    }

}

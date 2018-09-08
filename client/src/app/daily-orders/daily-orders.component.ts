import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../orders.service";
import {Menu} from "../domainObjects/menu";
import {Observable} from "rxjs/Observable";

import {FoodOrder} from "../domainObjects/foodOrder";
import {Dish} from "../domainObjects/dish";
import {Router} from "@angular/router";

@Component({
  selector: 'app-daily-orders',
  templateUrl: './daily-orders.component.html',
  styleUrls: ['./daily-orders.component.css']
})
export class DailyOrdersComponent implements OnInit {

    foodOrders: FoodOrder[] = [];

    priceForTheDay: number = 0;

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit() {
      this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllCompanyOrdersForDay(new Date()).catch((err) => {
        // Do messaging and error handling here
        return Observable.throw(err);
    }).subscribe(
        (data: FoodOrder[]) => {
            console.log(data);
            this.foodOrders = data;

            for(let foodOrder of this.foodOrders) {
                foodOrder.foodOrderPrice = 0;
                for(let dish of foodOrder.dishes) {
                    this.priceForTheDay += dish.price;
                    foodOrder.foodOrderPrice += dish.price;
                }
            }
            console.log(data);
        }
    );
  }

  navigateToMenu() {
      this.router.navigateByUrl('/menu');
  }

}

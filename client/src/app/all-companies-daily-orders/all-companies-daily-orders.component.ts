import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FoodOrder} from "../domainObjects/foodOrder";
import {OrdersService} from "../orders.service";

@Component({
  selector: 'app-all-companies-daily-orders',
  templateUrl: './all-companies-daily-orders.component.html',
  styleUrls: ['./all-companies-daily-orders.component.css']
})
export class AllCompaniesDailyOrdersComponent implements OnInit {

    companyNames;
    companiesWithOrders;
    companyPrices;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getAllOrdersForAllCompanies();
  }

  getAllOrdersForAllCompanies() {
      this.ordersService.getAllOrdersForAllCompaniesForDay(new Date()).catch((err) => {
          // Do messaging and error handling here
          return Observable.throw(err);
      }).subscribe(
          (data: any) => {
              console.log(data);
              this.companiesWithOrders = [];
              this.companyPrices = [];
              this.companyNames = Object.keys(data);

              for (let prop in this.companyNames) {
                  this.companiesWithOrders.push(data[this.companyNames[prop]]);
              }

              for(let companyOrders of this.companiesWithOrders) {
                  let companyPrice = 0;
                  for(let foodOrder of companyOrders) {
                      console.log("11111111111");
                      foodOrder.foodOrderPrice = 0;

                      for(let dish of foodOrder.dishes) {
                          foodOrder.foodOrderPrice += dish.price;
                      }
                      companyPrice+= foodOrder.foodOrderPrice;
                  }
                  this.companyPrices.push(companyPrice);
              }

              console.log("fdsfdsfs");
          }
      );
  }
}

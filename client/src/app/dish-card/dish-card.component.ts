import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../domainObjects/dish";

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {

    checked: boolean = false;

    @Input() public id;
    @Input() public name;
    @Input() public allergens;
    @Input() public price;
    @Input() public foodPic;

    @Output() selectDish = new EventEmitter<Dish>();

    constructor() { }

    ngOnInit() {
    }

    cardClick() {
        this.checked = !this.checked;
        this.selectDish.emit(new Dish(this.id, this.name, this.price, this.checked));
    }

}

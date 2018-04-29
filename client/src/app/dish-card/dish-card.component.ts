import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent implements OnInit {

    checked: boolean = false;

    @Input() public name;
    @Input() public allergens;
    @Input() public price;
    @Input() public foodPic;

    constructor() { }

    ngOnInit() {
    }

    cardClick() {
        this.checked = !this.checked;
    }

}

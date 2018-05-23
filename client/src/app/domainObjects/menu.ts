import {Dish} from "./dish";

export class Menu {
    dishes: Dish[];
    date: Date;

    constructor(dishes?: Dish[], date?: Date) {
        this.dishes = dishes;
        this.date = date;
    }
}

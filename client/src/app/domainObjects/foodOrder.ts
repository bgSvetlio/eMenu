import {Dish} from "./dish";
import {Menu} from "./menu";

export class FoodOrder {
    id: number;
    dishes: Dish[];
    menu: Menu;
    userName: string;
    timestamp: string;
    foodOrderPrice: number;
}
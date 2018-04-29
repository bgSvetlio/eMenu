export class Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    allergens: string;
    foodPic: string;

    constructor(name:string, description:string, price:number, allergens:string, foodPic?:string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.allergens = allergens;
        this.foodPic = foodPic;
    }
}

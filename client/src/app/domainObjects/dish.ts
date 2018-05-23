export class Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    allergens: string;
    foodPic: string;

    checked: boolean;

    constructor(id?: number, name?:string, price?:number, checked?:boolean, description?:string, allergens?:string, foodPic?:string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.allergens = allergens;
        this.foodPic = foodPic!=null? foodPic: "no-image.png";
        this.checked = checked;
    }
}

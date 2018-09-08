import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../domainObjects/dish";
import {MenuService} from "../menu.service";

@Component({
  selector: 'app-dish-card-create',
  templateUrl: './dish-card-create.component.html',
  styleUrls: ['./dish-card-create.component.css']
})
export class DishCardCreateComponent implements OnInit {

    checked: boolean = false;

    @Input() public id;
    @Input() public name;
    @Input() public allergens;
    @Input() public price;
    @Input() public foodPic;
    @Input() public description;

    @Output() updateDish = new EventEmitter<Dish>();

    fileToUpload: File = null;

    constructor(private menuService: MenuService) { }

    ngOnInit() {
    }

    focusOut() {
        this.updateDish.emit(new Dish(this.id, this.name, this.price, false, this.description, this.allergens, this.foodPic));
    }

    handleFileInput(files: FileList){
        this.fileToUpload = files.item(0);
        this.uploadFileToActivity();
    }

    uploadFileToActivity() {
        this.menuService.postFile(this.fileToUpload).subscribe(data => {
            this.foodPic = this.fileToUpload.name
            this.focusOut();
        }, error => {
            console.log(error);
        });
    }
}

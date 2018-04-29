package com.svetlio

class Dish {

    String name
    String description
    Double price
    String allergens
    String foodPic

    static constraints = {
        foodPic nullable: true
    }
}

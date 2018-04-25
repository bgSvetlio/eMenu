package com.svetlio

class Menu {

    static hasMany = [dishes: Dish]
    Date date
    Restaurant restaurant

    static constraints = {
    }
}

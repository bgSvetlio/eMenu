package com.svetlio

import java.time.LocalDate

class Menu {

    static hasMany = [dishes: Dish]
    LocalDate date
    Restaurant restaurant

    static constraints = {
    }

    static mapping = {
        dishes lazy: false
    }
}

package com.svetlio

import java.sql.Date

class Menu {

    static hasMany = [dishes: Dish]
    Date date
    Restaurant restaurant
    Boolean canOrder

    static constraints = {
        canOrder nullable: true
    }

    static mapping = {
        dishes lazy: false
    }
}

package com.svetlio

import java.sql.Date

class Menu {

    static hasMany = [dishes: Dish]
    Date date
    Restaurant restaurant

    static constraints = {
    }

    static mapping = {
        dishes lazy: false
    }
}

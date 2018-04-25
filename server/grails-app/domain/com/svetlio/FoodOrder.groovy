package com.svetlio

import com.svetlio.security.UserEMenu

import java.sql.Timestamp

class FoodOrder {

    static hasMany = [dishes: Dish]
    UserEMenu user
    Timestamp timestamp
    Menu menu

    static constraints = {
    }
}

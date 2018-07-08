package com.svetlio.marshallers

import com.svetlio.FoodOrder
import grails.converters.JSON

class OrdersMarshaller {
    void register() {
        JSON.registerObjectMarshaller(FoodOrder) { foodOrder ->
            return [
                    id: foodOrder.id,
                    dishes: foodOrder.dishes,
                    date: foodOrder.menu.date.format('yyyy-MM-dd'),
                    userName: foodOrder.user.username
            ]
        }
    }
}

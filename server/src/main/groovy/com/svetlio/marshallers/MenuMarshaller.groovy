package com.svetlio.marshallers

import com.svetlio.Menu
import grails.converters.JSON

class MenuMarshaller {
    void register() {
        JSON.registerObjectMarshaller(Menu) {   menu ->
            return [
                    id: menu.id,
                    dishes: menu.dishes,
                    date: menu.date.format('yyyy-MM-dd'),
                    restaurant: menu.restaurant
            ]
        }
    }
}

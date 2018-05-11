package emenu.com.svetlio

import com.svetlio.Dish
import com.svetlio.FoodOrder
import com.svetlio.Menu
import com.svetlio.security.UserEMenu
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

import java.sql.Timestamp

class OrderController {

    UserService userService
	
    def index() { }

    @Secured('ROLE_COMPANY')
    def save() {
        println "kokokoko"

        UserEMenu userEMenu = userService.getCurrentUser(request.getHeader("x-auth-token"))

        Menu menu = Menu.get(request.JSON.menu.id)

        def dishes = []

        def selectedDishes = request.JSON.selectedDishes

        selectedDishes.each{
            dishes.add(Dish.get(it.id))
        }

        FoodOrder foodOrder = new FoodOrder(user: userEMenu, timestamp: new Timestamp(System.currentTimeMillis()), menu: menu, dishes: dishes)
        foodOrder.save(flush:true)

        respond foodOrder
    }
}

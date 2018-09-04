package emenu.com.svetlio

import com.svetlio.Company
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

    @Secured('ROLE_ADMIN')
    def getCompanyOrdersForDay() {

        def date = params.date
        UserEMenu userEMenu = userService.getCurrentUser(request.getHeader("x-auth-token"))

        def orders = FoodOrder.findAll{menu.date == date && user.company == userEMenu.company}

        render orders as JSON
    }

    @Secured('ROLE_RESTAURANT')
    def getOrdersForDayForAllCompanies() {
        def mapOfOrders = [:]

        def date = params.date
        UserEMenu userEMenu = userService.getCurrentUser(request.getHeader("x-auth-token"))

        def companies = Company.findAll{restaurant == userEMenu.restaurant}

        companies.each{ company ->
            def orders = FoodOrder.findAll{menu.date == date && user.company.id == company.id}
            mapOfOrders.put(company.name, orders)
        }

        render mapOfOrders as JSON
    }
}

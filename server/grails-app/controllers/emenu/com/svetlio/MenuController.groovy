package emenu.com.svetlio

import com.svetlio.Dish
import com.svetlio.Menu
import com.svetlio.security.UserEMenu
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class MenuController {

    UserService userService

    @Secured('ROLE_COMPANY_EMPLOYEE')
    def index() {
        Menu menu = Menu.get(1)

        respond menu
    }

    @Secured('ROLE_COMPANY')
    def check() {
        Menu menu = Menu.findAll()[0]

        render menu as JSON
    }

    @Secured('permitAll')
    def show() {
        UserEMenu userEMenu = userService.getCurrentUser(request.getHeader("x-auth-token"))

        Menu menu = Menu.find{date == params.date && restaurant == (userEMenu.restaurant ?: userEMenu.company.restaurant)}

        if(menu) {
            render menu as JSON
        } else {
            render status: 400, text: "menuNotFound", contentType:"text/plain"
        }
    }

    @Secured('ROLE_RESTAURANT')
    def save() {
        UserEMenu userEMenu = userService.getCurrentUser(request.getHeader("x-auth-token"))

        Menu menu = Menu.get(request.JSON.menu.id) ?: new Menu(date: java.sql.Date.valueOf(request.JSON.menu.date.split("T")[0]), restaurant: userEMenu.restaurant)

        menu.dishes = []

        request.JSON.menu.dishes.each{
            menu.dishes.add(new Dish(name: it.name, description: it.description, price: it.price, allergens: it.allergens, foodPic: it.foodPic))
        }

        menu.save(flush:true)

        render menu as JSON
    }

    @Secured('permitAll')
    def saveDishPic() {
        File file = new File("D:\\portsmouth\\projectCode\\eMenu\\client\\src\\images\\dishes\\"+ params.fileKey.filename)
        params.fileKey.transferTo(file)

        respond params.fileKey.filename
    }
}

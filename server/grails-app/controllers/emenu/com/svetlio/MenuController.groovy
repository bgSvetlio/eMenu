package emenu.com.svetlio

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

        Menu menu = Menu.find{date == params.date && restaurant == userEMenu.company.restaurant}

        render menu as JSON
    }
}

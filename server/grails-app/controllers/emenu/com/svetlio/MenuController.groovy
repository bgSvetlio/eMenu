package emenu.com.svetlio

import com.svetlio.Menu
import com.svetlio.security.UserEMenu
import grails.plugin.springsecurity.annotation.Secured
import grails.plugin.springsecurity.rest.JwtService
import grails.plugin.springsecurity.rest.token.storage.jwt.JwtTokenStorageService
import grails.converters.*
import org.springframework.security.core.userdetails.UserDetailsService

class MenuController {

    JwtTokenStorageService jwtTokenStorageService
    UserDetailsService userDetailsService
    JwtService jwtService

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
//        Menu menu = Menu.findAll()[0]
        Menu menu = Menu.find{date == java.time.LocalDate.parse(params.date)}
//        AuthenticationDetailsSource.findAll()
//        JwtTokenStorageService jwtTokenStorageService = new JwtTokenStorageService()
//        UserDetails userDetails = jwtTokenStorageService.loadUserByToken(request.getHeader("x-auth-token"))
        com.nimbusds.jose.Payload payload = jwtService.parse(request.getHeader("x-auth-token")).payload
        def user = payload.toJSONObject().sub

        UserEMenu userEMenu = UserEMenu.find{username == user}

        Menu menu1 = Menu.find{date == java.time.LocalDate.parse(params.date) && restaurant == userEMenu.company.restaurant}

        respond JSON.use('deep'){render menu as JSON}
    }
}

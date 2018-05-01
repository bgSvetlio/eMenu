package emenu.com.svetlio

import com.svetlio.security.UserEMenu
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.rest.JwtService

@Transactional
class UserService {

    JwtService jwtService

    UserEMenu getCurrentUser(String token) {
        com.nimbusds.jose.Payload payload = jwtService.parse(token).payload
        def user = payload.toJSONObject().sub

        return UserEMenu.find{username == user}
    }
}

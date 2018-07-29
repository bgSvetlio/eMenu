package emenu.com.svetlio

import com.svetlio.Company
import com.svetlio.security.Role
import com.svetlio.security.UserEMenu
import com.svetlio.security.UserEMenuRole
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class RegisterController {

    @Secured('permitAll')
    def registerCompanyUser() {
        Company company = Company.find {name == request.JSON.comapnyName}

        if(!company) {
            render status: 400, text: "Company not found", contentType:"text/plain"
            return
        }

        if(company.secretKeyWord != request.JSON.secretKeyWord) {
            render status: 400, text: "Wrong company key word", contentType:"text/plain"
            return
        }

        Role role = Role.find{authority == "ROLE_COMPANY"}
        UserEMenu userEMenu = new UserEMenu(username: request.JSON.username, password: request.JSON.password, eMail: request.JSON.eMail, company: company)
        userEMenu.save(flush: true)
        UserEMenuRole userEMenuRole = new UserEMenuRole(userEMenu:  userEMenu, role: role)
        userEMenuRole.save(flush: true)

        respond userEMenu
    }
}

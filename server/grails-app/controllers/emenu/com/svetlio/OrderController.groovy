package emenu.com.svetlio

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class OrderController {
	
    def index() { }

    @Secured('ROLE_COMPANY')
    def save() {
        println "kokokoko"
    }
}

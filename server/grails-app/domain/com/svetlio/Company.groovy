package com.svetlio

class Company {

    String name
    String companyURL
    String secretKeyWord
    String phone
    Restaurant restaurant

    String sendOrderHour

    static constraints = {
        sendOrderHour nullable: true
    }
}

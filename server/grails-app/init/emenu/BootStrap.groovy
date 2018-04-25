package emenu

import com.svetlio.Company
import com.svetlio.Dish
import com.svetlio.FoodOrder
import com.svetlio.Menu
import com.svetlio.Restaurant
import com.svetlio.security.Role
import com.svetlio.security.UserEMenu
import com.svetlio.security.UserEMenuRole

import java.sql.Timestamp

class BootStrap {

    def init = { servletContext ->
        Restaurant restaurant = new Restaurant(name: "Wakawawa", restaurantURL: "waka", phone: "08839999999", eMail: "aaa@aaa.com").save(flush:true)

        Company company = new Company(name: "SyncHR", companyURL: "synchr", secretKeyWord: "kokoko", phone: "09999999999", restaurant: restaurant).save(flush:true)
        Company company1 = new Company(name: "Telerik", companyURL: "Telerik", secretKeyWord: "jojojo", phone: "088888888", restaurant: restaurant).save(flush:true)

        //Security bootstrap
        def role1 = new Role(authority:"ROLE_ADMIN").save(flush:true)
        def user1 = new UserEMenu(username:"sve",password:"qwe", eMail: "fds@fgd.com", company: company).save(flush:true)
        UserEMenuRole.create(user1,role1)

        def role2 = new Role(authority:"ROLE_RESTAURANT_ADMIN").save(flush:true)
        def user2 = new UserEMenu(username:"asd",password:"qwer", eMail: "fds@fgd.com", company: company).save(flush:true)
        UserEMenuRole.create(user2,role2)

        def role3 = new Role(authority:"ROLE_RESTAURANT_EMPLOYEE").save(flush:true)
        def user3 = new UserEMenu(username:"zxc",password:"qwert", eMail: "fds@fgd.com", company: company).save(flush:true)
        UserEMenuRole.create(user3,role3)

        def role4 = new Role(authority:"ROLE_COMPANY_HR_ADMIN").save(flush:true)
        def user4 = new UserEMenu(username:"vbn",password:"qwerty", eMail: "fds@fgd.com", company: company).save(flush:true)
        UserEMenuRole.create(user4,role4)

        def role5 = new Role(authority:"ROLE_COMPANY_EMPLOYEE").save(flush:true)
        def user5 = new UserEMenu(username:"ewq",password:"qwertyu", eMail: "fds@fgd.com", company: company).save(flush:true)
        UserEMenuRole.create(user5,role5)

        Dish dish = new Dish(name: "Musaka", description: "potatoes and meat", price: 3.20, allergens: "potato, eggs").save(flush:true)
        Dish dish1 = new Dish(name: "Kebab", description: "meat", price: 2.20, allergens:  "dfsfds").save(flush:true)
        Dish dish2 = new Dish(name: "Banica", description: "dough with cheese and eggs", price: 1.20, allergens:  "egs").save(flush:true)

        Menu menu = new Menu(dishes: [dish, dish1, dish2], date: new Date(), restaurant: restaurant).save(flush:true)

        FoodOrder order = new FoodOrder(dishes: [dish1, dish2], user: user5, timestamp: new Timestamp(System.currentTimeMillis()), menu: menu).save(flush:true)
        FoodOrder order1 = new FoodOrder(dishes: [dish, dish1], user: user5, timestamp: new Timestamp(System.currentTimeMillis()), menu: menu).save(flush:true)
    }
    def destroy = {
    }
}

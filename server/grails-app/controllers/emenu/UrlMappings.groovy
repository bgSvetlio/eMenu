package emenu

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/api/Menu"(controller: 'Menu')
        "/api/Menu/check"(controller: 'Menu', action: 'check')
        "/api/Menu/show"(controller: 'Menu', action: 'show')
        "/api/Menu/save"(controller: 'Menu', action: 'save')
        "/api/Menu/saveDishPic"(controller: 'Menu', action: 'saveDishPic')
        "/api/Order/save"(controller: 'Order', action: 'save')
        "/api/Order/getCompanyOrdersForDay"(controller: 'Order', action: 'getCompanyOrdersForDay')

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}

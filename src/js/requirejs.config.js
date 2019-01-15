require.config({
    // dist
    baseUrl : "/",

    paths : {
        "jquery" : "libs/jquery/jquery-1.11.3.min",
        "cookie" : "libs/jquery/jquery-plugins/jquery.cookie",
        "header" : "js/component/header",
        "footer" : "js/component/footer",
        "item" : "js/component/item",
        "ditem" : "js/component/ditem",
        "yitem" : "js/component/yitem",
        "pitem" : "js/component/pitem",
        "xitem" : "js/component/xitem",
        "url" : "js/component/url",
        "template" : "libs/template-web",
        "cartheader" : "js/component/cartheader",
        "banner" : "js/component/banner",
        "plate" :  "js/component/plate",
    },
    // 不符合AMD规范的模块，垫片
    shim : {
        "cookie" : {
            deps : ["jquery"]
        }
    }
})
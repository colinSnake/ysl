// 首页的业务逻辑
require(["./requirejs.config"],() => {
    // 引入index需要依赖的模块
    require(["jquery","ditem","yitem","pitem","url","header","banner","footer"],($,ditem,yitem,pitem,url) => {
        // 页面加载完渲染
        ditem.init(url.baseUrlRap2 + "discover");
        yitem.init(url.baseUrlRap2 + "yourself");
        pitem.init(url.baseUrlRap2 + "find");

        // 明星产品的动画
        let zx = $("#zx"),
            cz = $("#cz"),
            xs = $("#xs"),
            hf = $("#hf"),
            move = $("#move");
        console.log(zx);
        zx.on("click",function(){
            move.animate({left: 205},200)
        })   
        cz.on("click",function(){
            move.animate({left: 320},200)
        }) 
        xs.on("click",function(){
            move.animate({left: 420},200)
        }) 
        hf.on("click",function(){
            move.animate({left: 520},200)
        }) 
    })
})

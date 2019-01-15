// 商品列表页面的业务逻辑
require(["./requirejs.config"],() => {
    // 引入list需要依赖的模块(需要传参的写在前面)
    require(["jquery","item","url","header","footer"],($,item,url) => {
        item.init(url.baseUrlRap2 + "Perfume");

        // 瀑布流效果
    })
})
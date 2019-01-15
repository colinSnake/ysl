// 订单页面业务逻辑
require(["./requirejs.config"],() => {
    // 引入order依赖的模块
    require(["jquery","cartheader","footer","cookie"],() => {
        console.log("order");
    })
})
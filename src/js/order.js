// 订单页面业务逻辑
require(["./requirejs.config"],() => {
    // 引入order依赖的模块
    require(["jquery","cartheader","footer","cookie"],() => {
        console.log("order");
        // 取order cookie
        let orderArr = JSON.parse($.cookie("order"));
        console.log($.cookie("order"));
        let str = "";
        // 拼接出商品
        for(var value of orderArr){
            str += 
                `<dl>
                    <dt><a href="javascript:;"><img src="${ value.img }"></a></dt>
                    <dd>
                        <span>${ value.title }</span>
                        <span>50ml</span>
                        <p><b>数量：</b><span id="order-commodity-num">${ value.pnum }</span><span id="order-commodity-price">${ value.price }</span></p>
                    </dd>
                </dl>`
        }
        $(".order-commodity").html(str);

        // 按钮动画
        $(".immediate-settlement,#online-consultation,#order-confirm,#order-cancel").hover(function(){
            $(this).css({background : "#fff",color : "#000"});
        },function(){
            $(this).css({background : "#000",color : "#fff"});
        })
        
        // 计算总价
        calcPrice();
        function calcPrice(){
            let allPrice = 0;
            for(let i = 0; i < orderArr.length; i++){
                allPrice += parseInt(orderArr[i].pnum*orderArr[i].price.slice(1));
            }
            $(".totalPrice").text("￥"+allPrice);
        }

        // 结算完成
        $(".immediate-settlement").on("click",function(){
            if(confirm("确定结算吗？")){
                alert("结算完成");
                $(".order-commodity").remove();// 删除对应商品
                $.cookie("order","",{path: "/",expires: -1});// 清除购物车cookie
            }
        })
    })
})
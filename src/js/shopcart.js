// 购物车页面业务逻辑
require(["./requirejs.config"],() => {
    // 引入shopcart需要依赖的模块
    require(["jquery","footer","cartheader","cookie"],() => {
        // 购物车
        // 获取cookie，渲染生成商品
        let arr = JSON.parse($.cookie("cart"));
        // console.log(arr[0].price.slice(1),arr[0].pnum);// json对象
        console.log(typeof $.cookie("cart"));
        let productout = $("#product-out"),
            product = $("#product");
        let str = "";
        // 拼接出商品
        for(var value of arr){
            str += `
            <div class="middle" id="${value.id}">
                <span><a href="javascript:;" class="check" data-check="1"></a></span>
                <a href="./detail.html"><img src="${value.img}"></a>
                <p>
                    <span>${value.title}</span>
                    <span>${value.ml}</span>
                    <a href="javascript:;" class="deleteBtn">删除</a>
                </p>
                <span class="price">${value.price}</span>
                <p>
                    <span class="redBtn">-</span>
                    <span class="num">${value.pnum}</span>
                    <span class="addBtn">+</span>
                </p>
                <span class="sum"></span>
            </div>`
        }
        // 切换样式
        productout.html(str);

        // 操作功能
        // 事件监听
        // 增加商品
        productout.on("click",".addBtn",function(){
            let aNum = $(this).prev(".num").text(); // num
            let aPrice = $(this).parent("p").prev(".price").text().slice(1); // price
            $(this).prev(".num").text(++aNum);
            $(this).parent("p").next(".sum").text("￥"+(aNum*aPrice));// 每个商品的个数*单价之和
            // 修改cookie里面的pnum
            let details = JSON.parse($.cookie("cart"));
            $(".num").each(function(i,item){
                details[i].pnum = $(item).text();
            })
            $.cookie("cart",JSON.stringify(details),{path:"/",expires: 3})
            // console.log($.cookie("cart"));
            eachPrice();
        })
         // 减少商品
         productout.on("click",".redBtn",function(){
            let rNum = $(this).next(".num").text();
            let rPrice = $(this).parent("p").prev(".price").text().slice(1);
            if(rNum-- > 1){
                $(this).next(".num").text(rNum);
                $(this).parent("p").next(".sum").text("￥"+(rNum*rPrice));
            }
            let details = JSON.parse($.cookie("cart"));
            $(".num").each(function(i,item){
                details[i].pnum = $(item).text();
            })
            $.cookie("cart",JSON.stringify(details),{path:"/",expires: 3})
            console.log($.cookie("cart"));
            eachPrice();
        })
        console.log($(".check"));
        // 删除商品
        product.on("click",".deleteBtn",function(){
            if(confirm("确定删除此商品吗？")){
                let id = $(this).parent("p").parent(".middle").attr("id");
                console.log(id);// 2
                // 判断id是否相等
                let details = JSON.parse($.cookie("cart"));
                for(let i = 0; i < details.length; i++){
                    if(details[i].id === id){
                        details.splice(i,1); // 删除cookie里的当前对象
                        break;// 找到就跳出循环
                    }   
                } 
                $(this).parent("p").parent(".middle").remove();// 删除对应商品
                $.cookie("cart",JSON.stringify(details),{path:"/",expires: 3}); // 修改cookie
                eachPrice(); 
            }
            console.log($(".check").length);
            // 清空购物车，切换到空购物车样式
            if($(".check").length === 0){
                $(".cart").css({display : "none"});
                $(".emptycart").css({display : "block"});
            }
        })
        
        // 全选(白色代表选中)
        let n = $(".check").length;
        $("#allCheck").on("click",function(){
            let aChoose = $(this).attr("data-allCheck");// 设置的自定义属性
            let aCheck = $(".check"); // 获取所有单选框
            if(parseInt(aChoose)){
                $(this).addClass("al");
                aCheck.addClass("ac");
                $(this).attr("data-allCheck",0);
                aCheck.attr("data-check",0);
                $(".money").text("￥"+0);
            }else{
                $(this).removeClass("al");
                aCheck.removeClass("ac");
                $(this).attr("data-allCheck",1);
                aCheck.attr("data-check",1)
                eachPrice();
                order();
            }
        })

        // 单选(黑色代表选中)
        $(".check").on("click",function(){
            let choose = $(this).attr("data-check");// 设置的自定义属性
            // console.log(choose);
            // 修改单选框状态
            if(parseInt(choose)){// 字符串必须转换
                $(this).addClass("ac");
                $("#allCheck").addClass("al");
                $(this).attr("data-check",0);
                n--;
                eachPrice();
                order();
            }else{
                $(this).removeClass("ac");
                $("#allCheck").removeClass("al");
                $(this).attr("data-check",1);
                n++;
                eachPrice();
                order();
            }
            if(n !== $(".check").length){
                $("#allCheck").attr("data-check",0);
                $("#allCheck").addClass("al");
            }
            console.log(n);
            // console.log($(".ac").length);// number
        })
        
        console.log(parseInt($(".check").attr("data-check")));
        // 计算商品总价
        eachPrice();
        function eachPrice(){
            // 判断id是否相等
            // 遍历依次取出id
            let allPrice = 0,
                allNum = 0;
            $(".middle").each(function(i,item){
                let id = $(item).attr("id");
                let details = JSON.parse($.cookie("cart"));
                // 遍历依次从cookie里取出商品数量和单价
                for(let i = 0; i < details.length; i++){
                    if(details[i].id === id){// 判断id是否一致
                        if(parseInt($(".check").eq(i).attr("data-check"))){// 判断是否选中当前行
                            $(".sum").eq(i).text("￥"+details[i].price.slice(1)*details[i].pnum);// 遍历输出当前行商品价格
                            allNum += parseInt(details[i].pnum);// 计算总数量
                            allPrice += parseInt(details[i].price.slice(1)*details[i].pnum);// 计算总价  
                        }
                    }
                }
            });
            $(".cartNum").text(allNum);
            $(".money").text("￥"+allPrice); 
        }
        
        // 立即结算、客服咨询按钮动画效果
        $("#immediate-settlement,#online-consultation").hover(function(){
            $(this).css({background : "#fff",color : "#000"});
        },function(){
            $(this).css({background : "#000",color : "#fff"});
        })

        // 生成订单cookie
        function order(){
            let orderArr = JSON.parse($.cookie("cart"));
            for(let i = 0; i < $(".check").length; i++){
                if(!parseInt($(".check").eq(i).attr("data-check"))){
                    orderArr.splice(i,1);
                    console.log(orderArr);
                }
            }
            $.cookie("order",JSON.stringify(orderArr),{path: "/",expires: 3});
        }
        // 结算功能
        // 思路：重新生成一个订单cookie用来存放截取的商品对象（交付给订单页的数据），订单页完成结算，清除订单的cookie
        $("#immediate-settlement").on("click",function(){
            if($.cookie("user")){
                if(confirm("确定下单吗？")){
                    order();
                    setTimeout(() => {
                        window.location.href = "/html/order.html";
                    },1000)
                }
            }else{
                alert("请到登录页面登录");
                window.location.href = "./login.html";
            }
        }) 
    })
})
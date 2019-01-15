// 商品详情页面的业务逻辑
require(["./requirejs.config"],() => {
    // 引入detail需要依赖的模块(需要传参的写在前面)
    require(["jquery","url","template","header","footer","cookie"],($,url,template) => {
        // 获取传过来的商品id
        let arrSearch = location.search.slice(1).split("=");
        let searchObj = {};
        searchObj[arrSearch[0]] = arrSearch[1];
        console.log(searchObj);
        // 拿着id去请求数据
        $.ajax({
            url: url.baseUrlRap2 + "detail",
            type:"GET",
            data: searchObj,
            dataType:"json",
            success: function(res){
                console.log(res);
                // 加载详情页面资源
                if(res.res_code){
                    // 数据库传回来的数据(假接口)
                    let list = res.resbody.data;
                    // console.log(list);
                    // 通过模板引擎渲染(模板的用法)
                    let html = template("detail-template",{list : list});
                    // console.log(html);
                    $("#detail-item").html(html);

                    // 放大镜效果

                    console.log($("#detail-img1"));
                    $("#detail-img1").on("click",function(){
                        $("#pic").attr("src",$(this).children("img").attr("src"));
                        $(this).addClass("ac").siblings().removeClass("ac");
                        // console.log($(this).children("img").attr("src"));
                    })
                    $("#detail-img2").on("click",function(){
                        $("#pic").attr("src",$(this).children("img").attr("src"));
                        $(this).addClass("ac").siblings().removeClass("ac");
                    })

                    // 获取加入购物车
                    let addCart = $(".wrap #addCart"),
                        addBtn = $("#addBtn"),
                        redBtn = $("#redBtn"),
                        num = $("#num"),
                        index = 1;
                   
                    // 商品数量
                    // 增加商品
                    addBtn.on("click",function(){
                        index++;
                        num.html(index); 
                        console.log(index);
                        console.log(num.html());
                    })
                    // 减少商品
                    redBtn.on("click",function(){
                        if(--index <= 1){
                            index = 1;
                        }
                        num.html(index);
                        console.log(index);
                    })

                    // 购物车商品数量
                    addCart.on("click",function(){
                    getdata();
                    getHnum();
                    })
                    // 获取存入cookie数据
                    function getdata(){
                        let price = $("#price").text(),
                            title = $("#title").text(),
                            pnum = index,
                            ml = $("#ml").text(),
                            id = searchObj.id,
                            img = $("#pic").attr("src");
                            // console.log(img);
                            // console.log(pnum);
                        let detail = {
                            ml,pnum,title,price,img,id
                        }
                        addCookie(detail);
                    }
                         
                    // 生成cookie，传给购物车
                    function addCookie(obj){
                        // 判断cookie里面是否有值，有就解码（str->arr），没有就[]
                        let order = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
                        let flag = true;// 设置标志符
                        for(var i = 0; i < order.length; i++){
                            // 如果编号一样
                            if(order[i].id === obj.id){
                                order[i].pnum += index;// 数量加上当前的index值
                                flag = false;
                            }
                        }
                        if(flag){
                            //flag为true的话代表一次都没有进入if
                            order.push(obj);// 将对象插入到数组
                        }
                        // 将JSON数组转成JSON字符串存入cookie
                        $.cookie("cart",JSON.stringify(order),{path:"/"});// 加码操作（order转成str）
                        console.log(JSON.parse($.cookie("cart")));
                    }
                    
                    // 获取购物车商品数据赋值给头部
                    function getHnum(){
                        let aHeader = JSON.parse($.cookie("cart"));
                        let hNum =0;
                        let cnum = $("header #cnum");
                        for(let i = 0;i < aHeader.length; i++){
                            hNum += parseInt(aHeader[i].pnum);
                            cnum.text(hNum);
                        }
                    }
                }
                // var newCart = JSON.parse($.cookie("cart"));
                // var str = "";
                // console.log(searchObj.id);
                
            }
        })

    })
})
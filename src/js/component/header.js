// 定义模块
define(["jquery","plate","url","cookie"], ($,plate,url) => {
    class Header{
        constructor(){
            this.init();
        }

        init(){
            new Promise((resolve,reject) => {
                // 加载header.html
                $("header").load("/html/component/header.html",() => {
                    resolve();
                })
            }).then(() => {
                plate.init(url.baseUrlRap2 + "plate");
                this.login();
                this.search();
                this.getHnum();
            })
        }

        // 登录，切换样式
        login(){
            // 判断是否存在cookie
            if($.cookie("user")){
                let arr = JSON.parse($.cookie("user")); 
                let username = arr.username;
                // console.log(username);
                if(username){
                    $("#welcome").html("欢迎您，"+username+" 注销");
                    $("#welcome").on("click",function(){
                        // $("#welcome").attr({href : ""});
                        if(confirm("您确定退出？")){
                            $("#welcome").html("登录与注册");
                            $.cookie("user","",{ path: "/",expires: -1});// 清除用户cookie
                        }
                    })
                }else{
                    window.location.href = "../login.html";
                } 
            } 
        }

        // 搜索功能，调用百度接口
        search(){
            $("form").on("submit",function(e){
                e.preventDefault();
                //把form表单里面有name属性的表单元素值序列化
                var str = $("form").serialize();
                console.log(str);
                $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&"+str, function(res){
                    var data = res.s;
                    $(".empty").empty().show();
                    data.forEach((item, i) => {
                        $("<li>").html(item).appendTo($(".empty"));
                    })
        
                })
        
                $(".empty").on("click", "li", function(){
                    $("input[type=text]").val($(this).text());
                    $(".empty").hide();
                })
            })
        }
        
        // 获取头部购物车商品数量赋值给头部
        getHnum(){
            let aHeader = JSON.parse($.cookie("cart"));
            let hNum =0;
            let cnum = $("header #cnum");
            for(let i = 0;i < aHeader.length; i++){
                hNum += parseInt(aHeader[i].pnum);
                cnum.text(hNum);
            }
        }
    }

    // 搜索功能
    return new Header();
});
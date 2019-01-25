// 登录页面的业务逻辑
require(["./requirejs.config"],() => {
    // 引入login需要依赖的模块
    require(["url","jquery","header","footer","cookie"],(url) => {
        let check = false;// 判断cookie存放日期
        
        $("#choose").on("click",() =>{
            // 点击了存3天
            $("#checked").css({background : "#000"});
            check = true;
        })

        // 表单验证
        $(".form-login").on("blur","input",function(){
            if($(this).attr("name") === "username"){
                if($(this).val() === ""){
                    $(".error-username").removeClass("hidden").text("用户名不能为空"); 
                }else{
                    $(".error-username").addClass("hidden");
                    $(".form-login input").attr("data-flag","1"); 
                }
            }else if($(this).attr("name") === "pwd"){
                if($(this).val() === ""){
                    $(".error-pwd").removeClass("hidden").text("登录密码不能为空"); 
                }else{
                    $(".error-pwd").addClass("hidden");
                    $(".form-login input").attr("data-flag","1"); 
                }
            }
        });
        // 点击事件
        $("#sign-in").on("click",function(){
            // ajax请求数据库
            if(parseInt($(".form-login input").attr("data-flag"))){
                $.ajax({
                    url : url.baseUrlPhp + "v1/login.php",
                    type : "post",
                    dataType : "json",
                    data : {
                        username : $("#username").val(),
                        password : $("#pwd").val(),
                    },
                    success : function(res){
                        if(res.res_code){
                            if(check){
                                $.cookie("user", JSON.stringify(res.res_body), {path: "/", expires: 3});   
                            }else{
                                $.cookie("user", JSON.stringify(res.res_body), {path: "/"});
                            }
                            if(confirm("登录成功，去首页")){
                                setTimeout(() => {
                                    window.location.href = "/index.html";
                                },1000);
                            }
                        }else{
                            alert("用户名或密码错误");
                            setTimeout(() => {
                                window.location.href = "login.html";
                            },1000)
                        }
                    },
                })
            }else{
                alert("不能有为空项");
            }
        })

        // 按钮动画效果
        $("#sign-in,#create-account,#online-consultation").hover(function(){
            $(this).css({background : "#fff",color : "#000"});
        },function(){
            $(this).css({background : "#000",color : "#fff"});
        })
    })
})

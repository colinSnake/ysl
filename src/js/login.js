// 登录页面的业务逻辑
require(["./requirejs.config"],() => {
    // 引入login需要依赖的模块
    require(["url","jquery","header","footer","cookie"],(url) => {
        let username = $("#username"),
            password = $("#pwd"),
            aInput = $("input");
            
        let flag = false;// 验证输入框不能为空

        let check = false;// 判断cookie存放日期
        aInput.on("blur",function(){
            if(username.val() !== "" && password.val() !== 0){
                $("#sign-in").addClass("flag");
                flag = true;
            }
        });
        
        $("#choose").on("click",() =>{
            // 点击了存3天
            $("#checked").css({background : "#000"});
            check = true;
        })
        // 点击事件
        $("#sign-in").on("click",function(){
            // ajax请求数据库
            if(flag){
                $.ajax({
                    url : url.baseUrlPhp + "v1/login.php",
                    type : "post",
                    dataType : "json",
                    data : {
                        username : username.val(),
                        password : password.val(),
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

// 注册页面的业务逻辑
require(["./requirejs.config"],() => {
    // 引入register需要依赖的模块
    require(["url","jquery","header","footer"],(url) => {
        let tel = $("#tel"),
            pwd = $("#pwd"),
            username = $("#username"),
            msPwd = $("#msPwd"),
            aInput = $("input");

        let flag = false;
        // 验证为空
        aInput.on("blur",function(){
            if(tel.val() !== "" && pwd.val() !== "" && username.val() !== "" && msPwd !== ""){
                $("#register-btn").addClass("flag");
                flag = true;
            }
        })
        function Reg(){
            // 正则验证
            let telReg = /^1\d{10}$/;
            let userReg = /^\w+$/;
            let pwdReg = /^.{6,}$/;
            // let emailReg = /\w+@[a-z0-9]+\.[a-z]+/i; 
            if(!telReg.test(tel.val())){
                $(".error0").css({display : "block"});
                return false;
            }else if(!userReg.test(username.val())){
                $(".error1").css({display : "block"});
                return false;
            }else if(!pwdReg.test(pwd.val())){
                $(".error2").css({display : "block"});
                return false;
            }else if(pwd.val() !== msPwd.val()){
                $(".error3").css({display : "block"});
                return false;
            }
            return true;
        }
        // 注册逻辑
        $("#choose").on("click",() =>{
            $("#checked").css({background : "#000"});
            $("#register-btn").on("click",function(e){
                // console.log($("#tel").val());
                if(flag){
                    if(Reg()){
                        // 阻止表单提交默认行为
                        e.preventDefault();
                        // ajax请求数据
                        $.ajax({
                            url : url.baseUrlPhp + "v1/register.php",
                            type : "post",
                            dataType: "json",
                            data : {
                                tel : $("#tel").val(),
                                username : $("#username").val(),
                                password : $("#pwd").val(),
                            },
                            success : function(res){
                                if(res.res_code){
                                    alert("注册成功");
                                    setTimeout(() => {
                                            location.href = "/html/login.html";
                                    },1500);
                                }
                            },
                        });
                    }
                    
                }
            })
        })

        // 按钮动画效果
        $("#register-btn,#online-consultation").hover(function(){
            $(this).css({background : "#fff",color : "#000"});
        },function(){
            $(this).css({background : "#000",color : "#fff"});
        })

    })
})
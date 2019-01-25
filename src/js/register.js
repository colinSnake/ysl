// 注册页面的业务逻辑
require(["./requirejs.config"],() => {
    // 引入register需要依赖的模块
    require(["url","jquery","header","footer"],(url) => {

        // 表单验证
        let telReg = /^1\d{10}$/;
        let usernameReg = /^\w+$/;
        let pwdReg = /^.{6,}$/;

        $(".form-register").on("blur","input",function(){
            if($(this).attr("name") === "tel"){
                if($(this).val() === ""){
                    $(this).next(".error-tel").removeClass("hidden").text("电话号码不能为空");
                }else if(!telReg.test($(this).val())){
                    $(this).next(".error-tel").removeClass("hidden").text("请输入11位有效手机号码");
                }else{
                    $(this).next(".error-tel").addClass("hidden"); 
                    $(this).attr("data-flag","1");
                }
            }else if($(this).attr("name") === "username"){
                if($(this).val() === ""){
                    $(this).next(".error-username").removeClass("hidden").text("用户名不能为空");
                }else if(!usernameReg.test($(this).val())){
                    $(this).next(".error-username").removeClass("hidden").text("用户名只能是由数字、字母和下划线组成");
                }else{
                    $(this).next(".error-username").addClass("hidden"); 
                    $(this).attr("data-flag","1");
                }
            }else if($(this).attr("name") === "pwd"){
                if($(this).val() === ""){
                    $(this).next(".error-pwd").removeClass("hidden").text("密码不能为空");
                }else if(!pwdReg.test($(this).val())){
                    $(this).next(".error-pwd").removeClass("hidden").text("密码至少6位");
                }else{
                    $(this).next(".error-pwd").addClass("hidden"); 
                    $(this).attr("data-flag","1");
                }
            }else if($(this).attr("name") === "msPwd"){
                if($(this).val() === ""){
                    $(this).next(".error-msPwd").removeClass("hidden").text("确认密码不能为空");
                }else if($(this).val() !== $("#pwd").val()){
                    $(this).next(".error-msPwd").removeClass("hidden").text("两次密码不一致");
                }else{
                    $(this).next(".error-msPwd").addClass("hidden"); 
                    $(this).attr("data-flag","1");
                }
            }
        });

        // 注册逻辑
        $("#choose").on("click",() =>{
            $("#checked").css({background : "#000"});
            $("#register-btn").on("click",function(e){
                // console.log($("#tel").val());   
                // 阻止表单提交默认行为
                if(parseInt($(".form-register input").attr("data-flag"))){
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
                }else{
                    alert("不能有为空项");
                    window.location.reload();
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
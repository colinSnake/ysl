define(["jquery","template"],($,template) => {
    class Plate{
        constructor(){

        }

        init(url){
            new Promise((resolve,reject) => {
                // 加载plate.html
                console.log(url);
                $("#plate-item").load("/html/component/plate.html",() => {
                    resolve();
                })
            }).then(() => {
                $.ajax({
                    url : url,
                    type : "get",
                    success : function(res){
                        // console.log(res);
                        if(res.res_code){
                            // 数据库传回来的数据(假接口)
                            let list = res.res_body.data;
                            // 通过模板引擎渲染(模板的用法)
                            let html = template("plate-template",{list : list});
                            $("#plate-item").html(html);
                        }
                    }
                })
                this.nav();
            })
        }

        // 导航栏二级菜单效果
        nav(){
            $(".nav .model").hover(function(){
                // console.log(this);// model
                $(".plate").css({display : "block"});
            },function(){
                $(".plate").css({display : "none"});
                $(".plate").hover(function(){
                    // console.log(this);// plate
                    $(this).css({display : "block"});
                },function(){
                    $(this).css({display : "none"});
                })
            })
        }
    }
    return new Plate();
});
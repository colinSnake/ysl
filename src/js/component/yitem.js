define(["jquery","template"],($,template) => {
    class Yitem{
        constructor(){
            
        }
        // 初始化
        init(url){
            // 加载流程：先load页面,得到url,然后去请求数据，渲染结构
            // load
            console.log(url);
            new Promise((resolve,reject) => {
                $("#yours-item").load("/html/component/yitem.html",() =>{
                    resolve();
                })
            }).then(() => {
                // ajax请求
                $.ajax({
                    url : url,
                    type : "get",
                    success : function(res){
                        // console.log(res);
                        if(res.res_code){
                            // 数据库传回来的数据(假接口)
                            let list = res.res_body.data;
                            // 通过模板引擎渲染(模板的用法)
                            let html = template("yours-template",{list : list});
                            $("#yours-item").html(html);
                        }
                    }
                })
            })
        }
    }
    return new Yitem();
})
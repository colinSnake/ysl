define(["jquery"],() =>{
    class Banner{
        constructor(){
            this.init();
        }
        init(){
            // 加载banner.html
            new Promise((resolve,reject) => {
                $(".banner").load("/html/component/banner.html",() => {
                    resolve();
                })
            }).then(() => {
                // 自动轮播
                $(function(){
                    let $ul = $(".banner ul"),
                        $imgs = $ul.children(),
                        index = 0,
                        timer = null,
                        len = $imgs.length, // 5
                        liWidth = $imgs.eq(0).width(),
                        btns = []; // 存放创建的按钮
                        
                        // console.log($imgs);
                    // 拼接按钮
                    for(let i = 1; i <= len; i++){
                        btns.push($("<li>").html("").addClass(i===1 ? "ac" : "").appendTo(".banner ol"));
                    }
                
                    // 获取ul宽度和在最后一张图片后面再添加一张第一张图片
                    $ul.append($imgs.eq(0).clone());
                    $ul.width((len+1)*liWidth);
                
                    // 给每个按钮绑定点击事件
                    $.each(btns,function(i,$btn){// $btn是原生数组btns里的jQuery对象
                       $btn.on("click",function(){
                            btns[index].removeClass("ac");// 删除数组其他的按钮的"ac"
                            $(this).addClass("ac");// 给当前点击的加上"ac"
                            index = $(this).index();// 把当前点击的按钮的下标赋值过去
                            //移动图片的位置
                            $ul.stop().animate({left : -index * liWidth},"slow");
                       }); 
                    });                                                                           
                
                    // 绑定向左切换事件
                    $("#goPrev").on("click",function(){
                        btns[index].removeClass("ac");
                        if(--index < 0){
                            $ul.css({left : -len * liWidth});// 移到添加的那张图片的位置
                            index = len - 1;
                        }
                        // 否则按正常的样子切换
                        $ul.stop().animate({left : -index * liWidth},"slow");
                        btns[index].addClass("ac");
                    });
                
                    // 绑定向右切换事件
                    $("#goNext").on("click",function(){
                        btns[index].removeClass("ac");
                        if(++index >= len){
                            
                            $ul.stop().animate({left : -len * liWidth},"slow",function(){
                                $ul.css({left : 0});
                            });
                            index = 0;
                        }else{
                            $ul.stop().animate({left : -index * liWidth},"slow");
                        }
                        btns[index].addClass("ac");
                    });
                
                    // 设置自动播放
                    $(".banner .banner_wrap").hover(function(){
                        clearInterval(timer);
                    },(function autoPlay(){
                        timer = setInterval(() =>{
                            $("#goNext").trigger("click");
                        },3000);
                        return autoPlay;
                    })());
                });
            })
        }
    }
    return new Banner();
})
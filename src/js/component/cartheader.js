define(["jquery"],() => {
    class Cartheader{
        constructor(){
            this.init();
        }

        init(){
            // 加载footer.html
            $("header").load("/html/component/cartheader.html")
        }
    }
    return new Cartheader();
});
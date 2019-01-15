define(["jquery"],() => {
    class Footer{
        constructor(){
            this.init();
        }

        init(){
            // 加载footer.html
            $("footer").load("/html/component/footer.html")
        }
    }
    return new Footer();
});
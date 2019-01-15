// 引入模块
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const connect = require("gulp-connect");
const cleanCss = require("gulp-clean-css");

gulp.task("default",() => {
    console.log("gulp启动成功");
});

// 压缩html
gulp.task("html",() => {
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
                removeComments: true,//清除HTML注释
                collapseWhitespace: true,//压缩HTML
                collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
            })
        )
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload())
});

// 编译sass
// 压缩css
gulp.task("css",() => {
    gulp.src("src/scss/**/*.scss")
    .pipe(sass()) 
    .pipe(cleanCss()) // 压缩css
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
});

// ES6转ES5，压缩js
gulp.task("js",() => {
    gulp.src("src/js/**/*.js")
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload())
});

// 设置服务器
gulp.task("server",() => {
    // 开启服务器
    connect.server({
        port: 4396,
        // 默认加载
        livereload: true,
        root: "dist",
    })
});

// 移动静态资源（视频，图片，音频）
gulp.task("static",() => {
    gulp.src("src/static/**/*")
        .pipe(gulp.dest("dist/static"))
        .pipe(connect.reload())
});

// 移动libs
gulp.task("libs",() => {
    gulp.src("src/libs/**/*")
        .pipe(gulp.dest("dist/libs"))
});

// 监听文件改变
gulp.task("watch",() => {
    // 所有目录下的html,js,css
    gulp.watch("src/**/*.html",["html"]);
    gulp.watch("src/js/**/*.js",["js"]);
    gulp.watch("src/scss/**/*.scss", ["css"]);
});
// 启动所有的服务
gulp.task("default",["server","html","js","static","css","libs","watch"]);
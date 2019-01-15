

YSL圣罗兰美妆官网（低配版）
=======

## 背景介绍

YSL圣罗兰美妆,颠覆性法国高定设计师品牌,自由,大胆,始终引领当下.“着我装者, 着我妆” YSL美以其独特的风格,自由游走于优雅与率性之间.彩妆拒绝乏味,护肤悦享生命,香水为爱而生。

*JavaScript*，是一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。

*jQuery* , jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库（或JavaScript框架）。jQuery设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。

*requirejs* , RequireJS 是一个JavaScript模块加载器。它非常适合在浏览器中使用，但它也可以用在其他脚本环境，就像 Rhino and Node。使用RequireJS加载模块化脚本将提高代码的加载速度和质量。

*gulp* , 是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务。

## 项目介绍

*功能说明*，包含基本的电商购买流程

​	1.登录注册功能 ：使用php作为后端语言、MySQL作为开发数据库完成用户登录注册功能实现

​	2.主页功能 ：使用rap2数据接口，实现主页相关商品列表渲染。同时使用JavaScript实现主页界面的轮播图、推荐商品左右切换等交互效果的实现。点击商品进入详情页面

​	3.列表页功能 ：使用rap2数据接口，实现主页相关商品列表渲染。以及点击商品进入商品详情页

​	4.详情页功能 ：使用rap2数据接口，根据点击发送的id值向Rap2接口发送请求，获取相应商品信息进行页面渲染

​	5.购物车功能：点击编辑可以增加、减少数量，删除可删除商品，去结算将勾选的商品调到结算页面进行结算

## 使用说明


​	1.首先电脑（cmd）需要安装node.js环境（官网地址：https://nodejs.org/en/，点击下载左边的）

​	2.使用node -v指令和npm -v指令验证环境是否安装成功
​	3.可以使用npm install -g cnpm --registry=https://registry.npm.taobao.org指令下载cnpm镜像，通过cnpm -v指令验证是否安装成功
​	4.下载github上的源文件，使用npm/cnpm下载所需工具包，之后使用gulp构建后在浏览器输入<http:localhost:4396>进行访问
​	5.以上步骤完成就可以愉快的操作了。。。

### 页面使用

#### 主页使用

​	1.导航栏的登录注册链接到登录注册页面，搜索框使用百度接口模拟搜索显示，点击购物车进入购物车界面

​	2.轮播图左右切换以及按钮切换，鼠标移入左右按钮出现且轮播停止

  	3.使用Rap2接口模拟数据库资源，渲染首页的商品，点击商品可以跳转到商品详情页面

#### 登录注册页面使用

​	1.注册界面会验证信息合法性，如果有未输入的输入框则不能点击注册按钮，成功之后会在1.5秒后跳转登录界面（注意：不点击同意注册协议点击注册无效）

​	2.登录界面验证登录信息，成功在1秒后跳转主页

​	3.注意：用户不登录（数据库操作），无法进行结算功能，但不影响其他操作。

#### 列表页面使用

​	1.点击列表页点击商品跳转到商品详情页

#### 详情页面使用

​	1.点击+和-进行商品数量的加减，加入购物车会同步头部导航栏的购物车板块商品数量

​	2.查看商品有放大镜效果

#### 购物车页面使用

​	1.进入直接默认全选并计算出总价

​	2.点击+和-进行商品数量的加减，即时更新总价

​	3.点击删除操作，可以删除当前购物车商品，当商品数为0时，切换样式为空购物车状态

​	4.点击单选和全选操作，即时更新总价

​	5.点击立即结算，携带当前选中的商品信息，跳转到订单页，结算，清空订单的商品数据

#### 订单

​	1.点击结算按钮，清空订单的商品数据

### 待完善功能

​	1.首页的明星板块的轮播手动切换动画效果

​	2.列表页加载商品数据的瀑布流效果

​	3.详情页的商品的放大镜效果

​	4.订单页的页面还剩下表单地址验证没有完成

### 如何获取

​	1.Github项目地址：https://github.com/colinSnake/ysl.git

​	2.后续会持续完善页面逻辑功能。。。




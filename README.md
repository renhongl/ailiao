
### [AP_WEB](https://github.com/renhongl/AP_WEB)
***

* **TODO LIST:**
	1.加所有的过渡效果。
	2.多人聊天，消息存储错乱问题。--思路：其他消息发来，先存储。
	3.分组管理用一个选项，增删改查。
	4.扣扣消息图片。图片上传发送。
	5.头像上传。


* **介绍：**
	AP_WEB是想把电脑应用AP用网页的形式展示出来

* **前端：**
    * 封装基本功能：
        * 模块父类Controller.js、Model.js
        * Ajax请求Ajax.js。
        * 观察者模式Observer.js。
        * 元素可拖动Draggable.js。
        * 全局消息提示Message.js。
        * 按钮功能提示Tipy.js。
        * 点击雨滴效果Rain.js。
    * 模块设计：
        * 独特的Dialog。
        * 登录/注册模块。
        * 类似lync的聊天模块。
        * 记事本。
        * 小游戏：五指棋，打飞机等。
    * 基于的框架/整合的框架：
        * RequireJS
        * Bootstrap, 
        * Angular, 
        * vue。  

* **后端：**
    * nodejs做运行环境。
    * mongodb做数据库。
    * express做api。
    * 支持websocket。
    * 网站地址：lrh.ngrok.cc。
    * http端口：8080。
    * websocket端口： 9090。



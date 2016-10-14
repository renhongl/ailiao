
### [AP_WEB](https://github.com/renhongl/AP_WEB)
***

* **TODO LIST:**
	1.加所有的过渡效果。
	2.多人聊天，消息存储错乱问题。--思路：其他消息发来，先存储。
	3.分组管理用一个选项，增删改查。
	4.扣扣消息图片。图片上传发送。
	5.头像上传。
	6.做一个网站，保存自己的文档，用vue.js index.html页面的排版方式。

* **数据库、数据结构设计：**
	1:数据库名称:ap
	2:user:{name: "user1", pwd: "123456", email: "123.@163.com", intro:"Hello World", face:"/images/f1.png", groups: [], status: "/images/online.png"}
	3:user/groups/group: {name: "defaultGroup", users: []}
	4:user/groups/group/users/: {name: "user1", face: "/images/f1.png", intro: "Hello World", status: "/images/online.png"}
	5:chattings:[]
	6:chattings/chatting: {name: "user1", face: "/images/f1.png", status: "/images/online.png", current: true}
	7:records: {you: "user1", notYou: "user2", records: []}
	8:one record: {name: "user1", time: "2016-11-12 12:00", content: 'Hello User2'}



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



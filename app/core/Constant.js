/**
 * 存储所有的静态变量
 * 属于工具类，放在AP中
 */

define([], function() {
    'use strict';
    class Constant {}
    
    //Constants
    Constant.TEST = false;
    Constant.DEFAULT_PAGE = 'login';
    Constant.SKIP_AUTH = true;
    Constant.DEFAULT_FACE = '/images/defaultUser.jpg';
    Constant.DEFAULT_EMAIL = '邮箱地址';
    Constant.DEFAULT_INTRO = '说点什么？';
    Constant.DEFAULT_STATUS = '/images/online.png',
    Constant.DEFAULT_GROUPS = [{name: '默认分组1', users: [{name:'user1',face:'/images/defaultUser.jpg'},{name:'user2',face:'/images/defaultUser.jpg'}]}, {name: '默认分组2', users: [{name:'user1',face:'/images/defaultUser.jpg'},{name:'user2',face:'/images/defaultUser.jpg'}]}],

    //URL
    Constant.BASE_SERVER = 'http://127.0.0.1:8080/'; //lrh.ngrok.cc
    Constant.WS_SERVER = 'ws://127.0.0.1:9090/'; //lrh.apws.ngrok.cc
    Constant.LOGIN = Constant.BASE_SERVER + 'login';
    Constant.REGISTER = Constant.BASE_SERVER + 'register';
    Constant.GETINFOR = Constant.BASE_SERVER + 'getInfor';
    Constant.SETINFOR = Constant.BASE_SERVER + 'setInfor';
    
    return Constant;
});
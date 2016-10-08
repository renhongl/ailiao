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
    Constant.DEFAULT_GROUPS = [{name: '管理员', users: []},{name: '默认分组', users: []}],
    Constant.DEFAULT_CHATTINGS = [{name: '大风', face:'/images/f1.jpg', status:'/images/online.png', current: true}, {name: '风', face:'/images/f1.jpg', status:'/images/online.png'}, {name: '大漠', face:'/images/f1.jpg', status:'/images/online.png'}];
    Constant.DEFAULT_CURRENT = {name: '风如大漠', intro: '我是风如大漠。你们好。'};

    //URL
    Constant.BASE_SERVER = 'http://127.0.0.1:8080/'; //http://renhongl.hk1.ngrok.cc/
    Constant.WS_SERVER = 'ws://127.0.0.1:9090/'; //lrh.apws.ngrok.cc
    Constant.LOGIN = Constant.BASE_SERVER + 'login';
    Constant.REGISTER = Constant.BASE_SERVER + 'register';
    Constant.GETINFOR = Constant.BASE_SERVER + 'getInfor';
    Constant.SETINFOR = Constant.BASE_SERVER + 'setInfor';
    Constant.QUERYALL = Constant.BASE_SERVER + 'queryAll';
    Constant.QUERYBYNAME = Constant.BASE_SERVER + 'queryByName';
    Constant.ADDTOGROUP = Constant.BASE_SERVER + 'addToGroup';
    Constant.REMOVEUSER = Constant.BASE_SERVER + 'removeUser';
    
    return Constant;
});
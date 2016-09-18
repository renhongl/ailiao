/**
 * 存储所有的静态变量
 * 属于工具类，放在AP中
 */

define([], function() {
    'use strict';
    class Constant {
        
    }

    Constant.WS_SERVER = 'ws://127.0.0.1:9090/'; //lrh.apws.ngrok.cc
    Constant.TEST = false;
    Constant.BASE_SERVER = 'http://lrh.ngrok.cc/'; //lrh.ngrok.cc
    Constant.DEFAULT_PAGE = 'login';
    Constant.SKIP_AUTH = true;

    Constant.LOGIN = Constant.BASE_SERVER + 'login';
    Constant.REGISTER = Constant.BASE_SERVER + 'register';

    return Constant;
});
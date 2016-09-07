/**
 * Save all frontend constants
 */

define([

], function() {
    'use strict';
    class Constant {
        constructor() {
            console.log("init constant");
        }
    }

    Constant.WS_SERVER = 'ws://127.0.0.1:9090/'; //lrh.apws.ngrok.cc
    Constant.TEST = false;
    Constant.BASE_SERVER = 'http://127.0.0.1:8080/'; //lrh.ngrok.cc
    Constant.DEFAULT_PAGE = 'demo';

    return Constant;
});
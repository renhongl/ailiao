/**
 * 后台程序测试或者运行的入口
 * 
 */
'use strict';

const WebSocket = require('./WebSocket');
const Config = require('./Config');
const Server = require('./Server');
const Test = require('./Test');

class Main{
    constructor(){
        if(Config.TEST){
            new Test();
        }else{
            this._runSystem();
        }
    }

    _runSystem(){
        new Server(Config.SERVER_PORT);
    }
}

new Main();

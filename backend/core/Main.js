/**
 * Backend main function
 */
'use strict';

const WebSocket = require('./WebSocket');
const Config = require('./Config');
const Server = require('./Server');

class Main{
    constructor(){
        console.log('init main');
        this._run();
    }

    _runSystem(){
        new Server(Config.SERVER_PORT);
        new WebSocket(Config.WS_PORT);
    }

    _run(){
        const TEST = Config.TEST;
        if(TEST){
            new Server(Config.SERVER_PORT);
            new WebSocket(Config.WS_PORT);
        }else{
            this._runSystem();
        }
    }
}

new Main();

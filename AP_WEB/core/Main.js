/**
 * Backend main function
 */
'use strict';

const WebSocket = require('./WebSocket');
const Config = require('./Config');
const Server = require('./Server');

class Main{
    constructor(){
        const TEST = Config.TEST;
        if(TEST){
            new Server(Config.SERVER_PORT);
            new WebSocket(Config.WS_PORT);
        }else{
            this._runSystem();
        }
    }

    _runSystem(){
        new Server(Config.SERVER_PORT);
        new WebSocket(Config.WS_PORT);
    }
}

new Main();

/**
 * Backend main function
 */
'use strict';

const WebSocket = require('./WebSocket');
const Config = require('./Config');
const Server = require('./Server');
const Test = require('./Test');

class Main{
    constructor(){
        const TEST = Config.TEST;
        if(TEST){
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

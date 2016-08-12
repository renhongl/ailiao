/**
 * Backend main function
 */
'use strict';

const WebSocket = require('./WebSocket');
const Config = require('./Config');

class Main{
    constructor(){}

    runWebSocket(){
        this.ws = new WebSocket(Config.wsPort);
    }
}

let main = new Main();
main.runWebSocket();
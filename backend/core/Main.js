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
    }

    _runSystem(){
        let server = new Server(Config.SERVER_PORT);
        let webSocket = new WebSocket(Config.WS_PORT);
        server.run();
        webSocket.run();
        webSocket.connect();
    }

    _testServer(){
        let server = new Server(Config.SERVER_PORT);
        server.run();
    }

    _testWebSocket(){
        let webSocket = new WebSocket(Config.WS_PORT);
        webSocket.run();
        webSocket.connect();
    }

    run(){
        const TEST = Config.TEST;
        if(TEST){
            this._testServer();
            this._testWebSocket();
        }else{
            this._runSystem();
        }
    }
}

let main = new Main();
main.run();
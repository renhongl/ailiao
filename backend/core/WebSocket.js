/**
 * WebSocket server for all WebSocket client
 */
'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');

class WebSocket{
    constructor(port){
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socket.listen(this.server);
        this._addRouter();
        this._listenPort();
        this._connectListen();
    }

    _listenPort(){
        this.server.listen(this.port);
        console.log('Server listening 127.0.0.1:' + this.port);
    }

    _addRouter(){
        this.app.get('/', (req, res) => {
            res.send("Current path: /");
        });
    }

    _connectListen(){
        this.io.on('connection', (socket) => {
            this._listenWS(socket);
        });
    }
    
    _listenWS(socket){
        socket.emit('message', 'Hello Client');
    }
}

module.exports = WebSocket;

/**
 * 
 */
'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const Router = require('./Router');

class Server{
    constructor(port){
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socket.listen(this.server);
        this._run();
    }

    _run(){
        this.server.listen(this.port);
        this.app.use(express.static(__dirname.replace(/server\\core/, 'app')));
        new Router(this.app);
        console.log('HTTP listening: 127.0.0.1:' + this.port);
    }
}

module.exports = Server;

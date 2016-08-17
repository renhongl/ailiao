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
    }

    run(){
        this.server.listen(this.port);
        let router = new Router(this.app);
        router.run();
        console.log('Server listening 127.0.0.1:' + this.port);
    }
}

module.exports = Server;

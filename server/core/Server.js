/**
 * NodeJS做的服务器。
 * 1：创建时需要传入一个监听的端口。
 * 2：可以作为WebSocket的父类。
 * 3：监听后运行路由，等待请求。
 */
'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const Router = require('./Router');
const bodyParser = require('body-parser');

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
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(__dirname.replace(/server\\core/, 'app')));
        new Router(this.app);
        console.log('HTTP listening: 127.0.0.1:' + this.port);
    }
}

module.exports = Server;

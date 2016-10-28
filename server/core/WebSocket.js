/**
 * WebSocket的服务器端。
 * 1：创建时传入需要监听的端口。
 * 2：连接后测试是否连通。
 * 3：addRouter方法创建其他需要使用WS的实例。
 */
'use strict';

const Server = require('./Server');
const Forward = require('../wsRouter/Forward');
const Chess = require('../wsRouter/Chess');

class WebSocket extends Server{
    constructor(port){
        super(port);
    }

    _run(){
        this.server.listen(this.port);
        this._connect();
        console.log('WS listening: 127.0.0.1:' + this.port);
    }

    _connect(){
        let io = this.io;
        io.on('connection', (socket) => {
            socket.emit('message', 'WebSocket working successfully!');
            this._addRouter(io, socket);
        });
    }

    _addRouter(io, socket){
        new Forward(io, socket);
        new Chess(io, socket);
    }
}

module.exports = WebSocket;

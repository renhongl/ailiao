/**
 * WebSocket的服务器端。
 * 1：创建时传入需要监听的端口。
 * 2：连接后测试是否连通。
 * 3：addRouter方法创建其他需要使用WS的实例。
 */
'use strict';

const Server = require('./Server');
const Test = require('../wsRouter/Test');

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
        this.io.on('connection', (socket) => {
            socket.emit('message', 'WebSocket working successfully!');
            this._addRouter(socket);
        });
    }

    _addRouter(socket){
        new Test(socket);
    }
}

module.exports = WebSocket;

/**
 * WebSocket server for all WebSocket client
 */
'use strict';

const Server = require('./Server');

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
            this._addRouter(socket);
        });
    }

    _addRouter(socket){
        socket.emit('message', 'Hello Client');

        socket.on('WS_MSG', function(topic, obj){
            socket.emit(topic, obj);
        });
    }
}

module.exports = WebSocket;

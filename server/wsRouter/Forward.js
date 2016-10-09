/**
 * 
 */
'use strict';

class Forward{
    constructor(io, socket){
        this.io = io;
        this.socket = socket;
        this._forward();
    }

    _forward(){
        this.socket.on('message', function(msg){
            console.log(msg);
        });

        this.socket.on('error', function(e){
            console.log(e);
        });

        this.socket.on('disconnect', function(e){
            console.log('Some one disconnected');
        });

        this.socket.on('forward', (fromUser, toUser, content) => {
            this.io.sockets.emit(fromUser, {from: fromUser, to: toUser, content: content});
            this.io.sockets.emit(toUser, {from: fromUser, to: toUser, content: content});
        });
    }
}

module.exports = Forward;
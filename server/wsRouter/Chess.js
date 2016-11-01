/**
 * 
 */
'use strict';

class Chess{
    constructor(io, socket){
        this.io = io;
        this.socket = socket;
        this._start();
    }

    _start(){
        this.socket.on('message', function(msg){
            //console.log(msg);
        });

        this.socket.on('error', function(e){
            console.log(e);
        });

        this.socket.on('disconnect', function(e){
            //console.log('Some one disconnected');
        });

        this.socket.on('toPlayChess', (fromUser, toUser) => {
            this.from = fromUser;
            this.to = toUser;
            this.io.sockets.emit(fromUser + '-startChess');
            this.io.sockets.emit(toUser + '-startChess');
        });

        this.socket.on('putOne', (from, container) => {
            if(from === this.from){
                this.io.sockets.emit('refresh', from,this.to, container);
            }else{
                this.io.sockets.emit('refresh', from,this.from, container);
            }
        });
    }
}

module.exports = Chess;
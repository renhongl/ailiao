/**
 * 
 */
'use strict';

class Forward{
    constructor(socket){
        this.socket = socket;
        this._forward();
    }

    _forward(){
        this.socket.on('message', function(msg){
            console.log(msg);
        });

        this.socket.on('error', function(e){
            console.log('error');
        });

        this.socket.on('disconnect', function(e){
            console.log('Some one disconnected');
        });

        this.socket.on('forward', (fromUser, toUser, content) => {
            this.socket.emit('lrh', '你好大漠如风');
            this.socket.emit('lrh000', '你好，新人。');
        });
    }
}

module.exports = Forward;
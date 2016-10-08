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
        this.socket.on('forward', (fromUser, toUser, content) => {
            this.socket.emit(fromUser, content);
            this.socket.emit(toUser, content);
        });
    }
}

module.exports = Forward;
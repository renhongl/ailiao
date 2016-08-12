/**
 * WebSocket basic class
 */

'use strict';

import io from '../libs/socket.io';

class WebSocket{
    constructor(url){
        this.socket = io.connect(url);
        this._listenWS();
    }
    
    _listenWS(){
        this.socket.on('connect', () => {
            console.log("WS connected");
        });
        this.socket.on('message', (o) => {
            console.log(o);
        });
    }
}

export default WebSocket;
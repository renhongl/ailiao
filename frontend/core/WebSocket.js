/**
 * WebSocket basic class
 * If want to use WebSocket as a core tool, just like MessageBus extends 
 * WebSocket class then overwrite function _listenWS, after that you can 
 * write your own event listener.
 */

'use strict';

import io from '../libs/socket.io';

class WebSocket{
    constructor(url){
        this.socket = io.connect(url);
    }
    
    run(){
        let socket = this.socket;
        socket.on('connect', function(){
            console.log("WS connected");
        });
        socket.on('message', function(o){
            console.log(o);
        });
    }
}

export default WebSocket;
/**
 * Use to publish and subscribe message, based on class WebSocket
 */

'use strict';

import WebSocket from './WebSocket';

class MessageBus extends WebSocket{
    constructor(url){
        super(url);
    }

    //Overwite for different behavior listening
    _listenWS(){
        this.socket.on('connect', () => {
            console.log("MessageBus connected");
        });
        this.socket.on('open', (o) => {
            console.log(o);
        });
    }

}

export default MessageBus;
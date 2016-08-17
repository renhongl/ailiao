/**
 * Use to publish and subscribe message, based on class WebSocket
 */

'use strict';

import WebSocket from './WebSocket';

class MessageBus extends WebSocket{
    constructor(url){
        super(url);
    }

    run(){
        let socket = this.socket;
        socket.on('connect', function(){
            console.log("MessageBus connected");
        });
        socket.on('message', function(o){
            console.log(o);
        });
    }

    createPlugin($){
        let socket = this.socket;
        $.extend({
            publish: function(topic, obj){
                socket.emit('WS_MSG', topic, obj);
            },
            subscribe : function(topic, callback){
                socket.on(topic, callback);
            }
        });
    }

   
}

export default MessageBus;
/**
 * Use to publish and subscribe message, based on class WebSocket
 */

define([
    'WebSocket'
], function(WebSocket) {
    'use strict';
    class MessageBus extends WebSocket {
        constructor(url) {
            super(url);
        }

        _run() {
            let socket = this.socket;
            this._createPlugin();

            socket.on('connect', function() {
                console.log("MessageBus connected");
            });

            socket.on('message', function(o) {
                console.log(o);
            });
        }

        _createPlugin() {
            let socket = this.socket;
            $.extend({
                publish: function(topic, obj) {
                    socket.emit('WS_MSG', topic, obj);
                },
                subscribe: function(topic, callback) {
                    socket.on(topic, callback);
                }
            });
        }
    }

    return MessageBus;
});
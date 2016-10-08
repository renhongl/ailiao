/**
 * 用于连接服务器的WebSocket
 * 可作为任何需要使用WebSocket类的父类
 */
define(['io'], function(io) {
    'use strict';
    class WebSocket {
        constructor(url) {
            this.socket = io.connect(url);
        }

        getSocket() {
            let socket = this.socket;
            socket.on('connect', function() {
                console.log("WS connected");
            });
            socket.on('message', function(o) {
                console.log(o);
            });
            return socket;
        }
    }

    return WebSocket;
});
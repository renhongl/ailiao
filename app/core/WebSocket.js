define([
    'io'
], function(io) {
    'use strict';
    class WebSocket {
        constructor(url) {
            this.socket = io.connect(url);
            this._run();
        }

        _run() {
            let socket = this.socket;
            socket.on('connect', function() {
                console.log("WS connected");
            });
            socket.on('message', function(o) {
                console.log(o);
            });
        }
    }

    return WebSocket;
});
/**
 * 测试ws路由是否连接成功。
 */
'use strict';

class Test{
    constructor(socket){
        this.socket = socket;
        this._sendTest();
    }

    _sendTest(){
        socket.emit('test', 'WS Test');
    }
}
/**
 * Frontend javascript main class
 */

'use strict';

import WebSocket from './WebSocket';
import Constant from './Constant';
import MessageBus from './MessageBus';

class Main{
    constructor(){
        console.log('init main');
    }
    
    runWebSocket(){
        let ws = new WebSocket(Constant.ws);
    }

    runMessageBus(){
        let ms = new MessageBus(Constant.ws);
    }
}

let main = new Main();
main.runWebSocket();
main.runMessageBus();

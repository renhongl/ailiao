'use strict';

import WebSocket from './WebSocket'
import Page from './Page'
import MessageBus from './MessageBus'

export default class Test{
    constructor(){
        console.log('init test');
        this._run();
    }

    _run(){
        this._testWebSocket();
        this._testMessageBus();
        this._testQueryString();
    }

    _testWebSocket(){
        new WebSocket(AP.Constant.WS_SERVER);
    }

    _testMessageBus(){
        new MessageBus(AP.Constant.WS_SERVER);

        $.subscribe("dataload", function(data){
            console.log(JSON.stringify(data));
        });

        setTimeout(function(){
            $.publish("dataload", {"name": "lrh"});
        }, 5000);
    }

    _testQueryString(){
        console.log(AP.QueryString.getValue('page'));
    }
}
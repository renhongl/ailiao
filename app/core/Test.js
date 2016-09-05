'use strict';

import WebSocket from './WebSocket'
import Constant from './Constant'
import MessageBus from './MessageBus'
import QueryString from './QueryString'
import Page from './Page'

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
        new WebSocket(Constant.WS_SERVER);
    }

    _testMessageBus(){
        new MessageBus(Constant.WS_SERVER);

        $.subscribe("dataload", function(data){
            console.log(JSON.stringify(data));
        });

        setTimeout(function(){
            $.publish("dataload", {"name": "lrh"});
        }, 5000);
    }

    _testQueryString(){
        let qs = new QueryString();
        console.log(qs.getValue('page'));
    }
}
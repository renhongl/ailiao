'use strict';

import WebSocket from './WebSocket';
import Constant from './Constant';
import MessageBus from './MessageBus';
import $ from 'jquery';
import QueryString from './QueryString';

class Main{
    constructor(){
        console.log("init main");
    }

    _testWebSocket(){
        let ws = new WebSocket(Constant.WS_SERVER);
        ws.run();
    }

    _testMessageBus(){
        let ms = new MessageBus(Constant.WS_SERVER);
        ms.run();
        ms.createPlugin($);
        $.subscribe("dataload", function(data){
            console.log(JSON.stringify(data));
        });
        setTimeout(function(){
            $.publish("dataload", {"name": "lrh"});
        }, 5000);
    }

    _testQueryString(){
        let qs = new QueryString();
        console.log(qs.params.get('page'));
    }

    run(){
        const TEST = Constant.TEST;
        if(TEST){
            //this._testWebSocket();
            //this._testMessageBus();
            this._testQueryString();
        }else{
            let url = "";
            let page = new Page();
            page.run();
        }
    }

}

let main = new Main();
main.run();
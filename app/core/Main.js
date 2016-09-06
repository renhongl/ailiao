'use strict';

import $ from 'jquery'
import MessageBus from './MessageBus'
import Constant from './Constant'
import Test from './Test'
import QueryString from './QueryString'
import Ajax from './Ajax'
import Page from './Page'

export class Main{
    constructor(){
        $('#loadingDiv').fadeOut(1000);
        this._beforeLoad();
    }

    _beforeLoad(){
        window.$ = $;
        window.AP = {
            Constant,
            Ajax,
            QueryString,
            width: $(window).width(),
            height: $(window).height(),
            PC: $(window).width() > 700 ? true : false,
        };
        const TEST = Constant.TEST;
        if(TEST){
            new Test();
        }else{
            new MessageBus(Constant.WS_SERVER);
            this._loadPage();
        }
    }

    _loadPage(){
        let pageName = QueryString.getValue('page') || AP.Constant.DEFAULT_PAGE;
        let pagePath = './page/' + pageName;
        System.import(pagePath).then(function(result){
            new Page(result);
        });
    }
}

'use strict';

import Constant from './Constant'
import $ from 'jquery'
import Test from './Test'
import QueryString from './QueryString'
import Ajax from './Ajax'
import Page from './Page'

class Main{
    constructor(){
        console.log("init main");
        window.$ = $;
        this._run();
    }

    _run(){
        const TEST = Constant.TEST;
        if(TEST){
            new Test();
        }else{
            this._loadPage();
        }
    }

    _loadPage(){
        let qs = new QueryString();
        let pageName = qs.getValue('page') || 'demo';
        let pagePath = './page/' + pageName;
        System.import(pagePath).then(function(result){
            new Page(result);
        });
    }
}

new Main();
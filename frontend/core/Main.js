'use strict';

import Constant from './Constant';
import $ from 'jquery';
import Test from './Test';

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
            let url = "";
            let page = new Page();
            page.run();
        }
    }
}

new Main();
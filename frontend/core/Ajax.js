'use strict';

import MessageBus from './MessageBus';

export default class Ajax{
    constructor(){
        console.log('init ajax');
    }

    static getJSON(url, callback){
        $.ajax({
            dataType: 'json',
            url: url,
            success: callback
        });
    }

    static getScript(url, callback){
        $.ajax({
            dataType: 'script',
            url: url,
            success: callback
        });
    }
}
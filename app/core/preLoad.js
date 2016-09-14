/**
 * 在大部分库，文件加载完成前，显示一个页面载入中的画面。
 * 1：首先加载jquery，因为后面的很多文件都依赖于它。
 * 2：加载应用入口类Main。
 */
define(['jquery'], function($) {
    'use strict';
    class PreLoad{
        constructor(){
            window.$ = $;
            this._loading();
            this._loadMain();
        }

        _loading(){
            let $loadingDiv = $(`<div id='loadingDiv'></div>`);
            let $loadingImg = $(`<img id='loadingImg' src='images/loading.gif'/>`);
            $loadingDiv.append($loadingImg);
            $('body').append($loadingDiv);
        }

        _loadMain(){
            require(['Main'], function(Main){
                new Main();
            });
        }
    }

    return PreLoad;
});
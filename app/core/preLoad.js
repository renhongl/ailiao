/**
 * 在大部分库，文件加载完成前，显示一个页面载入中的画面。
 * 1：首先加载jquery，因为Main类合和后面的很多文件都依赖于它。
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
            let $loadingDiv = $('<div>').attr('id', 'loadingDiv').css({
                height: '100%',
                width: '100%',
                background: '#fff',
                position: 'relative',
                zIndex: 10,
            });

            let $loadingImg = $('<img/>').attr({
                id: 'loadingImg',
                src: '/images/loading.gif',
            }).css({
                display: 'block',
                margin: '0 43%',
                paddingTop: '100px',
            });

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
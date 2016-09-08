/**
 * 应用的运行入口
 */
define([
    'jquery', 
    'MessageBus', 
    'Constant', 
    'Test', 
    'QueryString', 
    'Ajax', 
    'Page'
], function($, MessageBus, Constant, Test, QueryString, Ajax, Page) {
    'use strict';
    class Main {
        constructor() {
            $('#loadingDiv').fadeOut(500);
            setTimeout(function(){
                $('#loadingDiv').remove();
            }, 1000);
            this._beforeLoad();
        }

        _beforeLoad() {
            require(['bootstrap'], () => {
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
                if (TEST) {
                    new Test();
                } else {
                    new MessageBus(Constant.WS_SERVER);
                    this._loadPage();
                }
            });
        }

        _loadPage() {
            let pageName = QueryString.getValue('page') || AP.Constant.DEFAULT_PAGE;
            let pagePath = 'page/' + pageName;
            require([pagePath + '.js'], function(config) {
                new Page(config);
            });
        }
    }

    return Main;
});
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
    'Page',
    'Tipy',
    'Draggable'
], function($, MessageBus, Constant, Test, QueryString, Ajax, Page, Tipy, Draggable) {
    'use strict';
    class Main {
        constructor() {
            this._removeLoading();
            this._loadGlobal();
        }

        _removeLoading() {
            $('#loadingDiv').fadeOut(500);
            setTimeout(function() {
                $('#loadingDiv').remove();
            }, 1000);
        }

        _loadGlobal() {
            require(['bootstrap'], () => {
                window.$ = $;
                window.AP = {
                    Constant,
                    Ajax,
                    QueryString,
                    Tipy,
                    Draggable,
                    width: $(window).width(),
                    height: $(window).height(),
                    PC: $(window).width() > 700 ? true : false,
                };
                let messageBus = new MessageBus(Constant.WS_SERVER);
                messageBus.run();
                this._verifyLogin();
            });
        }

        _verifyLogin() {
            const TEST = Constant.TEST;
            if (Constant.SKIP_AUTH) {
                if (TEST) {
                    new Test();
                } else {
                    this._loadPage();
                }
            }
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
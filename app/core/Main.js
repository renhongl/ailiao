/**
 * 是应用的总入口。
 * 1：加载所有的库，和全局类。
 * 2：加载完成后说明应用已经可以很快显示，所以删除正在载入的画面。
 * 3：将加载得类绑定在全局变量AP上。以后使用很方便，直接在AP下面找，而且全局变量只有一个。
 * 4：如果是测试某一个文件，进入测试类。如果不是测试，就根据url加载页面。
 */
define([
    'Constant',
    'Test',
    'QueryString',
    'Ajax',
    'Page',
    'Tipy',
    'Draggable',
    'Observer',
    'bootstrap'
], function(Constant, Test, QueryString, Ajax, Page, Tipy, Draggable, Observer) {
    'use strict';
    class Main {
        constructor() {
            new Observer();
            this._removeLoading();
            this._loadGlobal();
            this._verifyLogin();
        }

        _removeLoading() {
            $('#loadingDiv').fadeOut(500);
            setTimeout(function() {
                $('#loadingDiv').remove();
            }, 1000);
        }

        _loadGlobal() {
            window.AP = {
                Constant,
                Ajax,
                QueryString,
                Tipy,
                Draggable,
                width: $(window).width(),
                height: $(window).height(),
                PC: $(window).width() > 1000 ? true : false,
            };
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
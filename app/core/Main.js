/**
 * 是应用的总入口。
 * 1：加载所有的库，和全局类。
 * 2：加载完成后说明应用已经可以很快显示，所以删除正在载入的画面。
 * 3：将加载的类绑定在全局变量AP上。以后使用很方便，直接在AP下面找，而且全局变量只有一个。
 * 4：如果是测试某一个文件，进入测试类。如果不是测试，就根据url加载页面。
 * 5：有些类全局只需要运行一次，就不放在AP中，而是在之后new一个。
 * 6：工具类的规则：尽量将工具的css全部写在类里，这样如果其他项目需要这个工具，可以只应用这个js文件。
 */
define([
    'Constant',
    'Test',
    'QueryString',
    'Ajax',
    'Page',
    'Tipy',
    'Draggable',
    'Rain',
    'Observer',
    'Message',
    'Vue',
    'Auth',
    'WebSocket',
    'bootstrap'
], function(Constant, Test, QueryString, Ajax, Page, Tipy, Draggable, Rain, Observer, Message, Vue, Auth, WebSocket) {
    'use strict';
    class Main {
        constructor() {
            this._removeLoading();
            this._loadGlobal();
            this._verifyLogin();
        }

        _removeLoading() {
            $('#loadingDiv').fadeOut(500, () => {$('#loadingDiv').remove();});
        }

        _loadGlobal() {
            window.AP = {
                Constant,//只有静态属性
                Ajax,//只有静态方法
                QueryString,//只需一个实例，并且需要放在AP中，所以在类定义时就创建一个实例返回
                Tipy,//
                Draggable,//创建时需要传入需要拖动的元素
                Message,//创建时需要传入需要显示的消息，包括title和content
                width: $(window).width(),//当前浏览器宽度
                height: $(window).height(),//当前浏览器高度
                Vue,
                socket: new WebSocket(Constant.WS_SERVER).getSocket(),
            };

            //运行一次就能在全局出现效果
            new Rain();
            new Observer();
            new Auth();
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
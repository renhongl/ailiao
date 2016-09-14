/**
 * 在拿到对应页面的配置信息后，加载出整个页面。
 * 1：加载页面title。
 * 2：加载页面的各个dialog。
 * 3：加载各个dialog里面的模块。
 */
define([], function() {
    'use strict';
    class Page {
        constructor(config) {
            this.config = config;
            this._loadTitle();
            this._loadDialogs();
        }

        _loadTitle() {
            $('title').html(this.config.title);
        }

        _loadDialogs() {
            let dialogs = this.config.dialogs;
            let dialogStyle = 'modules/dialog/style.css';
            if (dialogs.length !== 0) {
                $('head').append(`<link rel='stylesheet' href=${ dialogStyle } />`);
            }
            for (let dialog of dialogs) {
                this._loadDialog(dialog);
            }
        }

        _loadDialog(dialog) {
            let dialogPath = 'modules/dialog/';
            let dialogController = dialogPath + 'controller';
            require([dialogController + '.js'], (controller) => {
                $.subscribe(`${ dialog.id }-loaded`, () => {
                    if (dialog.content) {
                        this._loadModule(dialog.content, $(`#${ dialog.id } .content`));
                    }
                });
                new controller(dialog, $('body'));
            });
        }

        _loadModule(module, $container) {
            let modulePath = `modules/${ module.id }/`;
            let moduleController = modulePath + 'controller';
            let moduleStyle = `modules/${ module.id }/style.css`;

            $('head').append(`<link rel='stylesheet' href=${ moduleStyle } />`);

            require([moduleController + '.js'], (controller) => {
                new controller(module, $container);
            });
        }
    }

    return Page;
});
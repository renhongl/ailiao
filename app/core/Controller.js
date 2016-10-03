/**
 * 是所有模块中controller的父类
 * 1： 根据配置信息，设置窗口大小和位置
 * 2： 加载html,如果是dialog继续加载其中的模块，如果不是，直接加载dialog的model类。
 * 3： 引入renderTree和handleEvents方法
 */
define([], function() {
    'use strict';
    class Controller {
        constructor(obj, $container, config) {
            this.obj = obj;
            this.$container = $container;
            this.config = config;
            this._setContainer();
            this._loadHtml();
        }

        _setContainer() {
            let obj = this.obj;
            let $dialog = $('<div>').attr({
                id: obj.id,
                class: obj.type,
            });
            this.$dialog = $dialog;

            if (obj.type === 'dialog') {
                if (obj.show === false) {
                    $dialog.css({
                        display: 'none',
                    });
                    $.subscribe(`${obj.id}-show`, () => {
                        setTimeout(function(){
                            $('.dialog').removeClass('current');
                            $dialog.addClass('current');
                            $dialog.fadeIn();
                        }, 1000);
                    });
                }
                $dialog.css({
                    left: obj.settings.x,
                    top: obj.settings.y,
                    width: obj.settings.width,
                    height: obj.settings.height,
                    resize: 'both',
                    overflow: 'hidden',
                });
            } else {
                if (this.obj.showTitle) {
                    $dialog.css({
                        width: '100%',
                        height: '100%',
                        paddingTop: '30px',
                    });
                } else {
                    $dialog.css({
                        width: '100%',
                        height: '100%',
                        paddingTop: 0,
                    });
                }
            }
        }

        _loadHtml() {
            let obj = this.obj;
            let $container = this.$container;
            let $dialog = this.$dialog;
            let url = 'modules/dialog/view.html';
            let modelPath = `modules/${obj.id}/model.js`;

            if (obj.type !== 'dialog') {
                url = `modules/${obj.id}/view.html`
            }

            let callback = () => {
                $container.append($dialog);
                this._renderTree();
                this._handleEvents();
                this._runVue();
                if (obj.type === 'dialog') {
                    if (!this.obj.showTitle) {
                        $dialog.find('.title').css({
                            display: 'none',
                        });
                    }
                    $.publish(`${obj.id}-loaded`);
                } else {
                    require([modelPath], (model) => {
                        new model(this.obj, this.config);
                    });
                }
            };

            AP.Ajax.loadHTML($dialog, url, callback);
        }

        _runVue(){
            
        }

        _renderTree() {

        }

        _handleEvents() {

        }
    }

    return Controller;
});
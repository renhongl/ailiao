/**
 * 是所有模块中controller的父类
 * 1： 根据配置信息，设置窗口大小和位置
 * 2： 加载html,如果是dialog继续加载其中的模块，如果不是，直接加载dialog的model类。
 * 3： 引入renderTree和handleEvents方法
 */
define([], function() {
    'use strict';
    class Controller {
        constructor(obj, $container) {
            this.obj = obj;
            this.$container = $container;
            this._setContainer();
            this._loadHtml();
        }

        _setContainer(){
            let obj = this.obj;
            let $dialog = $('<div>').attr('id', obj.id).attr('class', obj.type);
            this.$dialog = $dialog;
            
            if (obj.type === 'dialog') {
                if (AP.PC) {
                    $dialog.css('left', obj.settings.x).css('top', obj.settings.y);
                    $dialog.width(obj.settings.width).height(obj.settings.height);
                } else {
                    //TODO Should use phone version.
                    $dialog.css('left', '0px').css('top', AP.height * 0 + 'px');
                    $dialog.width('100%').height('100%');
                }
            } else {
                $dialog.css('left', obj.settings.x).css('top', obj.settings.y);
                $dialog.width(obj.settings.width).height(obj.settings.height);
            }
        }

        _loadHtml(){
            let obj = this.obj;
            let $container = this.$container;
            let $dialog = this.$dialog;
            let url = 'modules/dialog/view.html';
            let modelPath = `modules/${ obj.id }/model.js`;

            if (obj.type !== 'dialog') {
                url = `modules/${ obj.id }/view.html`
            }

            let callback = () => {
                $container.append($dialog);
                this._renderTree();
                this._handleEvents();
                if (obj.type === 'dialog') {
                    $.publish(`${ obj.id }-loaded`);
                }else{
                    require([modelPath], (model) => {
                        new model(this.obj);
                    });
                }
            };

            AP.Ajax.loadHTML($dialog, url, callback);
        }

        _renderTree() {

        }

        _handleEvents() {

        }
    }

    return Controller;
});
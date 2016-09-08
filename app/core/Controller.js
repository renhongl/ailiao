/**
 * 是所有模块中controller的父类
 * 1： 根据配置信息，设置窗口大小和位置
 * 2： 载入html和model
 * 3： 引入renderTree和handleEvents方法
 */
define([], function() {
    'use strict';
    class Controller {
        constructor(obj, $container) {
            this.obj = obj;
            this.$container = $container;
            let $dialog = $('<div>').attr('id', obj.id).attr('class', obj.type);
            
            if (obj.type === 'dialog') {
                if (AP.PC) {
                    $dialog.css('left', obj.settings.x).css('top', obj.settings.y);
                    $dialog.width(obj.settings.width).height(obj.settings.height);
                } else {
                    //Should use phone version.
                    $dialog.css('left', '0px').css('top', AP.height * 0 + 'px');
                    $dialog.width('100%').height('100%');
                }
            } else {
                $dialog.css('left', obj.settings.x).css('top', obj.settings.y);
                $dialog.width(obj.settings.width).height(obj.settings.height);
            }

            let url = 'modules/dialog/view.html';
            if (obj.type !== 'dialog') {
                url = `modules/${ obj.id }/view.html`
            }

            let callback = () => {
                let modelPath = `modules/${ this.obj.id }/model.js`;
                this.$container.append($dialog);
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

        _setContainer(){

        }

        _loadHtml(){
            
        }

        _renderTree() {

        }

        _handleEvents() {

        }
    }

    return Controller;
});
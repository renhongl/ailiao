define([
    
], function() {
    'use strict';
    class Controller {
        constructor(obj, $container) {
            this.obj = obj;
            this.$container = $container;
            let $dialog = $('<div>').attr('id', obj.id).attr('class', obj.type);
            $dialog.width(obj.settings.width).height(obj.settings.height);
            if (obj.id === 'dialog') {
                if (AP.PC) {
                    $dialog.css('left', obj.settings.x).css('top', obj.settings.y);
                } else {
                    $dialog.css('left', '0px').css('top', '0px');
                }
            } else {
                $dialog.css('left', obj.settings.x).css('top', obj.settings.y);
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

        _renderTree() {

        }

        _handleEvents() {

        }
    }

    return Controller;
});
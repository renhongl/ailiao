
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _renderTree() {
            new AP.Draggable($(`#${ this.obj.id }`));
            for(let button of $(`#${ this.obj.id }`).find('span')){
                new AP.Tipy($(button));
            }
        }

        _handleEvents() {

            $(`#${ this.obj.id }`).off('click').on('click', (e) => {
                this._addFocusStyle(e);
            });

            $(`#${ this.obj.id }`).off('mousedown').on('mousedown', (e) => {
                this._addFocusStyle(e);
            });

            $(`#${ this.obj.id } .glyphicon-remove`).off('click').on('click', (e) => {
                this._closeDialog();
            });

            $(`#${ this.obj.id } .glyphicon-unchecked`).off('click').on('click', (e) => {
                this._maxDialog();
            });

            $(`#${ this.obj.id } .glyphicon-minus`).off('click').on('click', (e) => {
                this._minDialog();
            });

            $(`#${ this.obj.id } .glyphicon-th-large`).off('click').on('click', (e) => {
                this._normalDialog();
            });
        }

        _normalDialog(){
            $(`#${ this.obj.id }`).find('.content').css('display', 'block');
            $(`#${ this.obj.id }`).find('.glyphicon-unchecked').css('display', 'inline-block');
            $(`#${ this.obj.id }`).find('.glyphicon-th-large').css('display', 'none');
            $(`#${ this.obj.id }`).find('.glyphicon-minus').css('display', 'inline-block');
            $(`#${ this.obj.id }`).css('top', this.obj.settings.y + 'px').css('left', this.obj.settings.x + 'px');
            $(`#${ this.obj.id }`).width(this.obj.settings.width + 'px').height(this.obj.settings.height + 'px');
        }

        _minDialog(){
            $(`#${ this.obj.id }`).find('.content').css('display', 'none');
            $(`#${ this.obj.id }`).find('.glyphicon-th-large').css('display', 'inline-block');

            $(`#${ this.obj.id }`).find('.glyphicon-unchecked').css('display', 'none');
            $(`#${ this.obj.id }`).find('.glyphicon-minus').css('display', 'none');

            $(`#${ this.obj.id }`).css('top', this.obj.settings.y * 0.1 + 'px').css('left', this.obj.settings.x * 0.5 + 'px');
            $(`#${ this.obj.id }`).width('250px').height('30px');
        }

        _maxDialog(){
            $(`#${ this.obj.id }`).find('.glyphicon-th-large').css('display', 'inline-block');

            $(`#${ this.obj.id }`).find('.glyphicon-unchecked').css('display', 'none');
            $(`#${ this.obj.id }`).find('.glyphicon-minus').css('display', 'none');

            $(`#${ this.obj.id }`).css('top', 0).css('left', 0);
            $(`#${ this.obj.id }`).width(AP.width).height(AP.height);
        }

        _closeDialog(){
            $(`#${ this.obj.id }`).remove();
        }

        _addFocusStyle(e) {
            $('.dialog').removeClass('current');
            $(`#${ this.obj.id }`).addClass('current');
        }
    }

    return controller;
});
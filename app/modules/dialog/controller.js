
define(['Controller', 'Draggable', 'Tipy'], function(Controller, Draggable, Tipy) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container) {
            super(obj, $container);
        }

        _renderTree() {
            new Draggable($(`#${ this.obj.id }`));
            this._addTipy();
        }

        _handleEvents() {
            $('.dialog').off('click').on('click', (e) => {
                this._handleClick(e);
            });

            $('.dialog').off('mousedown').on('mousedown', (e) => {
                this._handleClick(e);
            });
        }

        _addTipy(){
            for(let button of $('.dialog').find('span')){
                Tipy.tipy($(button));
            }
        }

        _handleClick(e) {
            $('.dialog').removeClass('current');
            $(e.currentTarget).addClass('current');
        }
    }

    return controller;
});
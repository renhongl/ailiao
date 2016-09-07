define([
    'Controller',
    'model',
    'Draggable'
], function(Controller, model, Draggable) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container) {
            super(obj, $container);
        }

        _renderTree() {
            new model(this.obj);
            new Draggable($(`#${ this.obj.id }`));
        }

        _handleEvents() {
            $('.dialog').off('click').on('click', (e) => {
                this._handleClick(e);
            });
        }

        _handleClick(e) {
            $('.dialog').removeClass('current');
            $(e.currentTarget).addClass('current');
        }
    }

    return controller;
});
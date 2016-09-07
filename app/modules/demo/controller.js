define([
    'Controller',
    'model'
], function(Controller, model) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container) {
            super(obj, $container);
        }

        _renderTree() {
            new model(this.obj);
        }

        _handleEvents() {

        }
    }

    return controller;
});
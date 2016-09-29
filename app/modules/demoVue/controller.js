
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _renderTree() {
            let vue = new AP.Vue({
                el: '#test',
                data: {
                    message: 'Hello Vue.js'
                }
            });
            setTimeout(function(){
                vue.message = 'Hello World';
            }, 3000);
        }

        _handleEvents() {

        }
    }

    return controller;
});
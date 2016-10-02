
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let config = {
                el: '#test',
                data: {
                    message: 'Hello Vue.js'
                }
            };
            this.vue = new AP.Vue(config);
            setTimeout( () => {
                this.vue.message = 'Hello World';
            }, 3000);
        }

        _renderTree() {
            
        }

        _handleEvents() {

        }
    }

    return controller;
});
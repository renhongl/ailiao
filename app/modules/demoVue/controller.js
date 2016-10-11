
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let config = {
                el: '.demoVue',
                data: {
                    items: []
                }
            };
            this.vue = new AP.Vue(config);
            setInterval( () => {
                this.vue.items.push(1);
            }, 1000);
        }

        _renderTree() {
            
        }

        _handleEvents() {

        }
    }

    return controller;
});
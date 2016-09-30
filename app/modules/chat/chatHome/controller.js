
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
            
        }

        _runVue(){
            let config = {
                el: '.chatHome',
                data: {
                    name: '',
                    status: '',
                    location: '',
                    intro: '',
                },
                computed: {
                    intro: {
                        get: function(){
                            return '';
                        },
                        set: function(newValue){
                            debugger;
                        }
                    }
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            
        }

        _handleEvents() {
            $.subscribe('userInfo-loaded', (o, args) => {
                this.vue.name = args.infor.name;
                this.vue.status = args.infor.status || '在线';
                this.vue.location = args.infor.location || '不详';
                this.vue.intro = args.infor.intro || '说点什么？';
            });

            $('.chatHome .intro').on('focus', function(){
                $('.chatHome .introFoot').css({
                    background: '#fff',
                });
            });

            $('.chatHome .intro').on('blur', function(){
                $('.chatHome .introFoot').css({
                    background: '#b7b5b5',
                });
            });
        }
    }

    return controller;
});
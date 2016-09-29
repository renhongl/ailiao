
define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let that = this;
            let vue = new AP.Vue({
                el: '.login',
                data: {
                    userName: '',
                    password: '',
                },
                methods: {
                    login: that._login,
                    register: that._regiser,
                    verify: that._verify
                }
            });
        }

        _regiser(){
            $.publish('register-show');
        }

        _login(){
            this.verify();
        }

        _verify(){
            debugger;
        }
    }

    return controller;
});
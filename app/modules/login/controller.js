
define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let that = this;
            let config = {
                el: '.login',
                data: {
                    userName: '',
                    password: '',
                },
                methods: {
                    login: that._login.bind(that),
                    register: that._regiser.bind(that),
                    verify: that._verify.bind(that)
                }
            };
            this.vue = new AP.Vue(config);
        }

        _regiser(){
            $.publish('register-show');
        }

        _login(){
            if(this.vue.verify()){
                let url = AP.Constant.LOGIN;
                let postData = {
                    userName: this.vue.userName,
                    password: this.vue.password,
                };
                let callback = function(result){
                    localStorage.name = result.result.name;
                    location = '/?page=dashboard';
                };
                AP.Ajax.post(url, postData, callback);
            }
        }

        _verify(){
            let noError = true;
            if(this.vue.userName === ''){
                noError = false;
                new AP.Message('error', '请输入账号。');
            }
            if(this.vue.password === ''){
                noError = false;
                new AP.Message('error', '请输入密码。');
            }
            return noError;
        }
    }

    return controller;
});
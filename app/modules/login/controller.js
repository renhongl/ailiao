
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
            if(this.verify()){
                let url = AP.Constant.LOGIN;
                let postData = {
                    userName: this.userName,
                    password: this.password,
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
            if(this.userName === ''){
                noError = false;
                new AP.Message('error', '请输入账号。');
            }
            if(this.password === ''){
                noError = false;
                new AP.Message('error', '请输入密码。');
            }
            return noError;
        }
    }

    return controller;
});
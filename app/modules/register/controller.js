
define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let that = this;
            let vue = new AP.Vue({
                el: '.register',
                data: {
                    userName: '',
                    password: '',
                },
                methods: {
                    register: that._register,
                    verify: that._verify,
                }
            });
        }

        _register() {
            if (this.verify()) {
                let url = AP.Constant.REGISTER;
                let postData = {
                    userName: this.userName,
                    password: this.password,
                };
                AP.Ajax.post(url, postData, function (result) {
                    new AP.Message('success', '账号注册成功！');
                    setTimeout(function(){
                        $('#register').slideUp();
                    }, 1000);
                });
            }
        }

        _verify() {
            let noError = true;
            if (this.userName === '') {
                new AP.Message('error', '请输入账号。');
                noError = false;
            }
            if (this.password === '') {
                new AP.Message('error', '请输入密码。');
                noError = false;
            }
            return noError;
        }

    }

    return controller;
});
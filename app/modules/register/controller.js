define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue() {
            let that = this;
            let config = {
                el: '.register',
                data: {
                    userName: '',
                    password: '',
                },
                methods: {
                    register: that._register.bind(that),
                    verify: that._verify.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _handleEvents() {
            $('.backToLogin').on('click', function() {
                setTimeout(function() {
                    $("#register").animate({
                        left: 0,
                        top: 0,
                        width: 0,
                    }, 500);
                }, 500);

                setTimeout(function() {
                    $("#login").animate({
                        left: 0,
                        top: 0,
                        width: AP.width,
                    }, 500);
                }, 500);
            });
        }

        _register() {
            if (this.vue.verify()) {
                let url = AP.Constant.REGISTER;
                let postData = {
                    userName: this.vue.userName,
                    password: this.vue.password,
                };
                AP.Ajax.post(url, postData, function(result) {
                    new AP.Message('success', '账号注册成功！');
                    setTimeout(function() {
                        setTimeout(function() {
                            $("#register").animate({
                                left: 0,
                                top: 0,
                                width: 0,
                            }, '5000');
                        }, 500);

                        setTimeout(function() {
                            $("#login").animate({
                                left: 0,
                                top: 0,
                                width: AP.width,
                            }, '5000');
                        }, 500);
                    }, 1000);
                });
            }
        }

        _verify() {
            let noError = true;
            if (this.vue.userName === '') {
                new AP.Message('error', '请输入账号。');
                noError = false;
            }
            if (this.vue.password === '') {
                new AP.Message('error', '请输入密码。');
                noError = false;
            }
            return noError;
        }

    }

    return controller;
});
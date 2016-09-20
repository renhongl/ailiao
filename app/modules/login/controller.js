
define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container) {
            super(obj, $container);
        }

        _renderTree() {

        }

        _handleEvents() {
            $('.login #loginButton').on('click', () => {
                this._login();
            });

            $('.login #registerButton').on('click', () => {
                this._register();
            });
        }

        _register() {
            $.publish('register-show');
        }

        _login() {
            if (this._verify()) {
                let loginURL = AP.Constant.LOGIN;
                let postData = {
                    username: $('#userName').val(),
                    password: $('#password').val(),
                };
                AP.Ajax.post(loginURL, postData, function (result) {
                    window.location = '?page=dashboard';
                });
            }
        }

        _verify() {
            let noError = true;
            if ($('#userName').val() === '') {
                new AP.Message('error', '账号信息', '请输入账号。');
                noError = false;
            }
            if ($('#password').val() === '') {
                new AP.Message('error', '密码信息', '请输入密码。');
                noError = false;
            }
            return noError;
        }
    }

    return controller;
});
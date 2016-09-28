
define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _renderTree() {

        }

        _handleEvents() {
            $('.register #registerButton').on('click', () => {
                this._register();
            });
        }

        _register() {
            if (this._verify()) {
                let regiterURL = AP.Constant.REGISTER;
                let postData = {
                    username: $('#userNameRg').val(),
                    password: $('#passwordRg').val(),
                };
                AP.Ajax.post(regiterURL, postData, function (result) {
                    new AP.Message('success', result.status, result.text);
                    $('#register').slideUp();
                });
            }
        }

        _verify() {
            let noError = true;
            if ($('#userNameRg').val() === '') {
                new AP.Message('error', '请输入账号。');
                noError = false;
            }
            if ($('#passwordRg').val() === '') {
                new AP.Message('error', '请输入密码。');
                noError = false;
            }
            return noError;
        }

    }

    return controller;
});
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue() {
            let that = this;
            let config = {
                el: '.resetPwd',
                data: {
                   email: '',
                   newPwd: '',
                   rePwd: '',
                },
                methods: {
                    toGetCode: that._toGetCode.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _handleEvents() {
            $('.toLogin').on('click', function() {
                setTimeout(function() {
                    $("#ResetPwd").animate({
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

        _toGetCode(){
            let email = this.vue.email;
            if(email === ''){
                new AP.Message('infor', '请输入验证邮箱。');
                return;
            }

            let url = AP.Constant.RESET_PWD + '?email=' + email;
            let callback = (result) => {
                debugger;
            };

            AP.Ajax.get(url, callback);
        }

    }

    return controller;
});
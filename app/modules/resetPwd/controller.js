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
                   code: '',
                },
                methods: {
                    toGetCode: that._toGetCode.bind(that),
                    resetPwd: that._resetPwd.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _handleEvents() {
            $('.toLogin').on('click', () => {
                this._toLogin();
            });
        }

        _toLogin(){
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
        }

        _reset(name){
            let url = AP.Constant.SET_INFOR;
            let postData = {
                name: name,
                pwd: this.vue.newPwd
            };
            let callback = (result) => {
                new AP.Message('success', '重置密码成功，即将返回登录页面。');
                setTimeout( () => {
                    this._toLogin();
                }, 3000);
            };
            AP.Ajax.post(url, postData, callback);
        }

        _resetPwd(){
            if(this.vue.newPwd !== this.vue.rePwd){
                new AP.Message('error', '两次密码不同。');
                return;
            }
            let email = this.vue.email;
            let url = AP.Constant.GET_INFOR + '?name=' + email;
            let callback = (result) => {
                let dbCode = result.result.infor.code;
                if(this.vue.code !== dbCode){
                    new AP.Message('error', '验证码不正确。');
                    return;
                }
                this._reset(result.result.infor.name);
            };
            AP.Ajax.get(url, callback);
        }

        _toGetCode(){
            let email = this.vue.email;
            if(email === ''){
                new AP.Message('infor', '请输入验证邮箱。');
                return;
            }
            let url = AP.Constant.GET_CODE + '?email=' + email;
            let callback = (result) => {
                new AP.Message('success', result.text);
            };
            AP.Ajax.get(url, callback);
        }

    }

    return controller;
});

define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            var that = this;
            let config = {
                el: '.chatHome',
                data: {
                    name: '',
                    status: '',
                    email: '',
                    intro: '',
                    face: '',
                    groups: ['G1', 'G2', 'G3'],
                },
                methods:{
                    setIntro: that._setIntro.bind(that),
                    setEmail: that._setEmail.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            
        }

        _handleEvents() {
            $.subscribe('userInfo-loaded', (o, args) => {
                this.vue.name = args.infor.name;
                this.vue.status = '在线';
                this.vue.email = args.infor.email || '修改email地址';
                this.vue.intro = args.infor.intro || '说点什么？';
                this.vue.face = args.infor.face || AP.Constant.FACEURL;
                this._setStatus();
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

            $('.statusValue').on('click', function(){
                $('.statusSelect').toggle();
            });

            $('.statusSelect li').on('click', (e) => {
                $('.statusSelect').toggle();
                this.vue.status = $(e.target).find('span').text() || $(e.target).text();
                this._setStatus();
            });
        }

        _setEmail(){
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                email: this.vue.email,
            };
            let callback = function(result){
                if(result.status === 'error'){
                    new AP.Message('error', result.text);
                }else{
                    new AP.Message('infor', '修改email地址成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setStatus(){
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                status: this.vue.status,
            };
            let callback = function(result){
                if(result.status === 'error'){
                    new AP.Message('error', result.text);
                }else{
                    new AP.Message('infor', '修改状态成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setIntro(){
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                intro: this.vue.intro,
            };
            let callback = function(result){
                if(result.status === 'error'){
                    new AP.Message('error', result.text);
                }else{
                    new AP.Message('infor', '修改签名成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }
    }

    return controller;
});
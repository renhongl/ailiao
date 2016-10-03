
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
                this.vue.status = '/images/online.png';
                this.vue.email = args.infor.email || '';
                this.vue.intro = args.infor.intro || '说点什么？';
                this.vue.face = args.infor.face || AP.Constant.FACEURL;
                this._setStatus();
            });

            $('.chatHome .intro').on('focus', function(){
                $('.chatHome .introFoot').css({
                    background: '#fff',
                    borderRight: '1px solid #353030',
                    borderBottom: '1px solid #353030',
                    boxShadow: '2px 2px 2px #b7b5b5',
                });
            });

            $('.chatHome .intro').on('blur', function(){
                $('.chatHome .introFoot').css({
                    background: '#b7b5b5',
                    borderRight: '1px solid #b7b5b5',
                    borderBottom: '1px solid #b7b5b5',
                    boxShadow: 'none',
                });
            });

            $('.statusValue').on('click', function(){
                $('.statusSelect').toggle();
            });

            $('.statusSelect li').on('click', (e) => {
                $('.statusSelect').toggle();
                this.vue.status = $(e.target).find('img').attr('src') || $(e.target).parent().find('img').attr('src');
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
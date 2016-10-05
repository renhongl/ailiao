
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
                    groups: [],
                    allUsers: [],
                    filterName: '',
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
                this.vue.status = AP.Constant.DEFAULT_STATUS;
                this.vue.email = args.infor.email || AP.Constant.DEFAULT_EMAIL;
                this.vue.intro = args.infor.intro || AP.Constant.DEFAULT_INTRO;
                this.vue.face = args.infor.face || AP.Constant.DEFAULT_FACE;
                if(args.infor.groups.length !== 0){
                    for(let group of args.infor.groups){
                        this.vue.groups.push(group);
                    }
                }else{
                    for(let group of AP.Constant.DEFAULT_GROUPS){
                        this.vue.groups.push(group);
                    }
                }
                this._initUser();
                this._updateGroup();
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
                    background: '#eaeaea',
                    borderRight: '1px solid #eaeaea',
                    borderBottom: '1px solid #eaeaea',
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

            setTimeout(function(){
                $('.groups .group').on('click', function(){
                    $("." + $(this).text()).toggle();
                    $(this).toggleClass('changeBg');
                    $(this).find('.groupFoot').toggleClass('rotateFoot');
                });
            }, 2000);

            $('.items i').on('click', function(){
                $('.items i').removeClass('selected');
                $(this).addClass('selected');
            });

            $('.search').on('focus', () => {
                $('.searchContainer').show();
                let url = AP.Constant.QUERYALL;
                let callback = (result) => {
                    this.vue.allUsers = result.result;
                };
                AP.Ajax.get(url, callback);
            });

            $('.search').on('blur', () => {
                $('.searchContainer').hide();
            });

        }

        _updateGroup(){
            for(let group of this.vue.groups){
                for(let user of group.users){
                    let url = AP.Constant.QUERYBYNAME + '?name=' + user.name;
                    let callback = (result) => {
                        for(let key of Object.keys(result.result)){
                            user[key] = result.result[key];
                        }
                    };
                    AP.Ajax.get(url, callback);
                }
            }
        }

        _initUser(){
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                status: this.vue.status,
                email: this.vue.email,
                intro: this.vue.intro,
                face: this.vue.face,
                groups: this.vue.groups,
               
            };
            let callback = function(result){
                if(result.status === 'error'){
                    new AP.Message('error', result.text);
                }else{
                    new AP.Message('infor', '账号初始化成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
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
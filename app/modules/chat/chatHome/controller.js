define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
            this.firstLoad = true;
        }

        _runVue() {
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
                    extend: {},
                },
                methods: {
                    setIntro: that._setIntro.bind(that),
                    setEmail: that._setEmail.bind(that),
                    addToGroup: that._addToGroup.bind(that),
                    extendGroup: that._extendGroup.bind(that),
                    showGroups: that._showGroups.bind(that),
                    removeUser: that._removeUser.bind(that),
                    toggleFaceStore: that._toggleFaceStore.bind(that),
                    addChatting: that._addChatting.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            
        }

        _handleEvents() {

            $.subscribe('userInfo-loaded', (o, args) => {
                this.vue.name = args.infor.name;
                if(this.firstLoad){
                    this.vue.status = AP.Constant.DEFAULT_STATUS;
                }else{
                    this.vue.status = args.infor.status || AP.Constant.DEFAULT_STATUS;
                }
                
                this.vue.email = args.infor.email || AP.Constant.DEFAULT_EMAIL;
                this.vue.intro = args.infor.intro || AP.Constant.DEFAULT_INTRO;
                this.vue.face = args.infor.face || AP.Constant.DEFAULT_FACE;
                this.vue.groups = args.infor.groups || AP.Constant.DEFAULT_GROUPS;
                for(let group of this.vue.groups){
                    let groupName = group.name;
                    if(this.vue.extend[groupName] === undefined){
                        this.vue.extend[groupName] = false;
                    }
                }

                this._initUser();
                this._initGroup();

                if(this.firstLoad){
                    this.firstLoad = false;
                    setInterval(() => {
                        this._initGroup();
                    }, 10000);
                }
            });

            window.onbeforeunload = () => {
                this.vue.status = '/images/offline.jpg';
                this._setStatus();
            }

            $('.chatHome .intro').on('focus', function () {
                $('.chatHome .introFoot').css({
                    background: '#fff',
                    borderRight: '1px solid #353030',
                    borderBottom: '1px solid #353030',
                    boxShadow: '2px 2px 2px #b7b5b5',
                });
            });

            $('.chatHome .intro').on('blur', function () {
                $('.chatHome .introFoot').css({
                    background: '#eaeaea',
                    borderRight: '1px solid #eaeaea',
                    borderBottom: '1px solid #eaeaea',
                    boxShadow: 'none',
                });
            });

            $('.statusValue').on('click', function () {
                $('.statusSelect').toggle();
            });

            $('.statusSelect li').on('click', (e) => {
                $('.statusSelect').toggle();
                this.vue.status = $(e.target).find('img').attr('src') || $(e.target).parent().find('img').attr('src');
                this._setStatus();
            });

            $('.items i').on('click', function () {
                $('.items i').removeClass('selected');
                $(this).addClass('selected');
            });

            $('.search').on('focus', () => {
                $('.searchContainer').show();
                $('.fa-search').addClass('fa-times').removeClass('fa-search');
                $('.searchDiv .fa-times').on('click', function () {
                    $('.searchContainer').hide();
                    $('.searchDiv .fa-times').addClass('fa-search').removeClass('fa-times');
                });
                let url = AP.Constant.QUERYALL;
                let callback = (result) => {
                    this.vue.allUsers = result.result;
                };
                AP.Ajax.get(url, callback);
            });

            $('.faceStore img').on('click', (e) => {
                this.vue.face = $(e.target).attr('src');
                this._setFace();
                $('.faceStore').hide();
            });
        }

        _addChatting(e){
            let name = $(e.target).parent().find('.userName').text();
            $.publish('addChatting', {name: name});
        }

        _toggleFaceStore(){
            $('.faceStore').toggle();
        }

        _removeUser(e){
            let removeUser = $(e.target).parent().find('.userName').text();
            let user = localStorage.name;
            let postData = {
                user: user,
                removeUser: removeUser,
            };
            let url = AP.Constant.REMOVEUSER;
            let callback = (result) => {
                if(result.status === 'success'){
                    $.publish('needRefresh');
                    new AP.Message('success', '删除成功。');
                }
            };
            AP.Ajax.delete(url, postData, callback);
        }

        _showGroups(e) {
            $(e.target).parent().find('.addToGroup').toggle();
        }

        _extendGroup(e) {
            if(this.vue.extend[$(e.target).text()]){
                this.vue.extend[$(e.target).text()] = false;
            }else{
                this.vue.extend[$(e.target).text()] = true;
            }
            $("." + $(e.target).text()).toggle();
            $(e.target).toggleClass('changeBg');
            $(e.target).find('.groupFoot').toggleClass('rotateFoot');
        }

        _addToGroup(e) {
            let addUser = $(e.target).parent().parent().find('.oneUserName').text();
            let allUsers = [];
            let $parent = $(e.target).parent();
            $parent.hide();
            let addGroup = $(e.target).text();
            let name = localStorage.name;
            let url = AP.Constant.ADDTOGROUP;
            let postData = {
                name: name,
                addUser: addUser,
                addGroup: addGroup,
            };
            let callback = (result) => {
                if(result.status === 'success'){
                    $('.searchContainer').hide();
                    $.publish('needRefresh');
                    new AP.Message('success', '添加成功。');
                }   
            };

            for(let group of this.vue.groups){
                for(let user of group.users){
                    allUsers.push(user.name);
                }
            }
            if(allUsers.indexOf(addUser) !== -1){
                new AP.Message('error', '同一个用户不能多次添加。');
                return;
            }

            $('.searchDiv .fa-times').addClass('fa-search').removeClass('fa-times');
            AP.Ajax.post(url, postData, callback);
        }

        _initGroup() {
            for (let group of this.vue.groups) {
                for (let user of group.users) {
                    let url = AP.Constant.QUERYBYNAME + '?name=' + user.name;
                    let callback = (result) => {
                        for (let key of Object.keys(result.result || {})) {
                            user[key] = result.result[key];
                        }
                    };
                    AP.Ajax.get(url, callback);
                }
            }
        }

        _initUser() {
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                status: this.vue.status,
                email: this.vue.email,
                intro: this.vue.intro,
                face: this.vue.face,
                groups: this.vue.groups,

            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    //new AP.Message('infor', '账号初始化成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setFace() {
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                face: this.vue.face,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    new AP.Message('infor', '修改头像成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setEmail() {
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                email: this.vue.email,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    new AP.Message('infor', '修改email地址成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setStatus() {
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                status: this.vue.status,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    new AP.Message('infor', '修改状态成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setIntro() {
            let url = AP.Constant.SETINFOR;
            let postData = {
                name: this.vue.name,
                intro: this.vue.intro,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    new AP.Message('infor', '修改签名成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }
    }

    return controller;
});

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
                    openVoice: true,
                    msgView: true,
                },
                computed: {
                    addedUsers: function(){
                        let users = [];
                        for(let group of this.groups){
                            for(let user of group.users){
                                users.push(user.name);
                            }
                        }
                        return users;
                    }
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
                    switchVoice: that._switchVoice.bind(that),
                    switchMsgView: that._switchMsgView.bind(that),
                    showDocs: that._showDocs.bind(that),
                    toggleGroupManager: that._toggleGroupManager.bind(that),
                    saveGroupChanges: that._saveGroupChanges.bind(that),
                    removeOneGroup: that._removeOneGroup.bind(that),
                    addOneGroup: that._addOneGroup.bind(that),
                    logout: that._logout.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            
        }

        _handleEvents() {

            $.subscribe('userInfo-loaded', (o, args) => {
                this._initAll(args);
            });

            window.onbeforeunload = () => {
                this.vue.status = '/images/offline.jpg';
                this._setStatus();
            }

            $('.chatHome .intro').on('focus', function () {
                $('.chatHome .introFoot').css({
                    background: '#fff',
                    borderRight: '1px solid #85cee4',
                    borderBottom: '1px solid #85cee4',
                    boxShadow: '2px 2px 2px rgba(0,0,0,0.5)',
                });
            });

            $('.chatHome .intro').on('blur', function () {
                $('.chatHome .introFoot').css({
                    background: '#85cee4',
                    borderRight: '1px solid #85cee4',
                    borderBottom: '1px solid #85cee4',
                    boxShadow: 'none',
                });
            });

            $('.statusValue').on('click', function () {
                $('.statusSelect').toggle();
            });

            $('.statusSelect li').on('click', (e) => {
                $('.statusSelect').toggle();
                if ($(e.target).find('img').attr('src') === undefined && $(e.target).parent().find('img').attr('src') === undefined) {
                    return;
                }
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
                let url = AP.Constant.QUERY_ALL;
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

            $('.toggleTools').on('click', function () {
                $('.toolsUL').toggle();
            });
        }

        _initAll(args) {
            this.vue.name = args.infor.name;
            if (this.firstLoad) {
                this.vue.status = AP.Constant.DEFAULT_STATUS;
            } else {
                this.vue.status = args.infor.status || AP.Constant.DEFAULT_STATUS;
            }

            this.vue.email = args.infor.email || AP.Constant.DEFAULT_EMAIL;
            this.vue.intro = args.infor.intro || AP.Constant.DEFAULT_INTRO;
            this.vue.face = args.infor.face || AP.Constant.DEFAULT_FACE;
            this.vue.groups = args.infor.groups || AP.Constant.DEFAULT_GROUPS;
            for (let group of this.vue.groups) {
                let groupName = group.name;
                if (this.vue.extend[groupName] === undefined) {
                    this.vue.extend[groupName] = false;
                }
            }

            this._setIntro();
            this._setEmail();
            this._setFace();
            this._setStatus();
            this._setGroup();
            this._initUser();
            this._initGroup();

            if (this.firstLoad) {
                this.firstLoad = false;
                setInterval(() => {
                    this._initGroup();
                }, 10000);
            }
        }

        _logout(){
            location = AP.Constant.BASE_SERVER;
        }

        _addOneGroup(){
            let group = {
                name: '新组',
                users: []
            };
            this.vue.groups.push(group);
        }

        _removeOneGroup(e){
            let removeGroup = $(e.target).parent().find('input').val();
            let count = 0;
            for(let group of this.vue.groups){
                if(group.name === removeGroup){
                    this.vue.groups.splice(count, 1);
                    return;
                }else{
                    count++;
                }
            }
        }

        _saveGroupChanges(){
            $('.groupManager').hide();
            this._setGroup();
            $.publish('needRefresh');
        }

        _toggleGroupManager(){
            $('.groupManager').toggle();
        }

        _showDocs(){
            $('#Documents').toggle();
        }

        _switchMsgView() {
            if (this.vue.msgView) {
                this.vue.msgView = false;
            } else {
                this.vue.msgView = true;
            }
            $.publish('switchMsgView');
        }

        _switchVoice() {
            if (this.vue.openVoice) {
                this.vue.openVoice = false;
            } else {
                this.vue.openVoice = true;
            }
            $.publish('switchVoice');
        }

        _addChatting(e) {
            let name = $(e.target).parent().find('.userName').text();
            $.publish('addChatting', { name: name });
        }

        _toggleFaceStore() {
            $('.faceStore').toggle();
        }

        _removeUser(e) {
            let removeUser = $(e.target).parent().find('.userName').text();
            let user = localStorage.name;
            let postData = {
                user: user,
                removeUser: removeUser,
            };
            let url = AP.Constant.REMOVE_USER;
            let callback = (result) => {
                if (result.status === 'success') {
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
            if (this.vue.extend[$(e.target).text()]) {
                this.vue.extend[$(e.target).text()] = false;
            } else {
                this.vue.extend[$(e.target).text()] = true;
            }
            $("." + $(e.target).text()).toggle();
            $(e.target).toggleClass('changeBg');
            $(e.target).find('.groupFoot').toggleClass('rotateFoot');
        }

        _addToGroup(e) {
            let addUser = $(e.target).parent().parent().find('.oneUserName').text();
            if (addUser === localStorage.name) {
                new AP.Message('error', '自己不能加自己。');
                return;
            }
            let allUsers = [];
            let $parent = $(e.target).parent();
            $parent.hide();
            let addGroup = $(e.target).text();
            let name = localStorage.name;
            let url = AP.Constant.ADD_TO_GROUP;
            let postData = {
                name: name,
                addUser: addUser,
                addGroup: addGroup,
            };
            let callback = (result) => {
                if (result.status === 'success') {
                    $('.searchContainer').hide();
                    $.publish('needRefresh');
                    new AP.Message('success', '添加成功。');
                }
            };

            for (let group of this.vue.groups) {
                for (let user of group.users) {
                    allUsers.push(user.name);
                }
            }
            if (allUsers.indexOf(addUser) !== -1) {
                new AP.Message('error', '同一个用户不能多次添加。');
                return;
            }

            $('.searchDiv .fa-times').addClass('fa-search').removeClass('fa-times');
            AP.Ajax.post(url, postData, callback);
        }

        _initGroup() {
            for (let group of this.vue.groups) {
                for (let user of group.users) {
                    let url = AP.Constant.QUERY_BY_NAME + '?name=' + user.name;
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
            let url = AP.Constant.SET_INFOR;
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

        _setGroup() {
            let url = AP.Constant.SET_INFOR;
            let postData = {
                name: this.vue.name,
                groups: this.vue.groups,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    //new AP.Message('infor', '初始化分组成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setFace() {
            let url = AP.Constant.SET_INFOR;
            let postData = {
                name: this.vue.name,
                face: this.vue.face,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    //new AP.Message('infor', '修改头像成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setEmail() {
            let url = AP.Constant.SET_INFOR;
            let postData = {
                name: this.vue.name,
                email: this.vue.email,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    //new AP.Message('infor', '修改email地址成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setStatus() {
            let url = AP.Constant.SET_INFOR;
            let postData = {
                name: this.vue.name,
                status: this.vue.status,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    // new AP.Message('infor', '修改状态成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _setIntro() {
            let url = AP.Constant.SET_INFOR;
            let postData = {
                name: this.vue.name,
                intro: this.vue.intro,
            };
            let callback = function (result) {
                if (result.status === 'error') {
                    new AP.Message('error', result.text);
                } else {
                    //new AP.Message('infor', '修改签名成功。');
                }
            };
            AP.Ajax.post(url, postData, callback);
        }
    }

    return controller;
});

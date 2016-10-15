
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let that = this;
            let config = {
                el: '.document',
                data: {
                    docs: [
                        {name: '简介', index: 'introDoc', current: true}, 
                        {name: 'AP_WEB 总需求', index: 'ap_webDoc', current: false},
                        {name: 'User API 设计', index: 'userApiDoc', current: false}, 
                        {name: 'Records API 设计', index: 'recordsApiDoc', current: false},
                        {name: 'AP 数据库 设计', index: 'dbDoc', current: false},
                        {name: '音乐播放器', index: 'musicPlayerDoc', current: false},
                        {name: '聊天室', index: 'chatRoomDoc', current: false},
                        {name: '爱心鱼', index: 'loveFishDoc', current: false},
                        {name: '应用平台桌面版', index: 'apDesktopDoc', current: false},
                        {name: '电脑远程控制工具', index: 'pcControlDoc', current: false},
                        {name: 'Git 常用命令', index: 'gitUsageDoc', current: false},
                        {name: 'Linux 知识', index: 'linuxDoc', current: false},
                        {name: '实用工具推荐', index: 'toolsDoc', current: false},
                    ], 
                },
                methods: {
                    changeDoc: that._changeDoc.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            let currentIndex = '';
            for(let doc of this.vue.docs){
                if(doc.current === true){
                    currentIndex = doc.index;
                }
            }
            this._getContentByDocIndex(currentIndex);

            $('#Documents').height(AP.height);
        }

        _handleEvents() {

        }

        _changeDoc(e){
            let name = $(e.target).text();
            let currentIndex = '';
            for(let doc of this.vue.docs){
                if(doc.name === name){
                    doc.current = true;
                    currentIndex = doc.index;
                }else{
                    doc.current = false;
                }
            }
            this._getContentByDocIndex(currentIndex);
        }

        _getContentByDocIndex(index){
            let $container = $('.docContent');
            let url = AP.Constant.BASE_SERVER + `modules/document/docs/${ index }.html`;
            let callback = (result) => {
                
            };
            AP.Ajax.loadHTML($container, url, callback)
        }
    }

    return controller;
});
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue() {
            let that = this;
            let config = {
                el: '.document',
                data: {
                    docs: this.config.docs,
                    currentDoc: {
                        index: '',
                        read: 0,
                        like: [],
                        comments: [

                        ]
                    }
                },
                methods: {
                    changeDoc: that._changeDoc.bind(that),
                    addLike: that._addLike.bind(that),
                    addComment: that._addComment.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            let currentIndex = '';
            for (let doc of this.vue.docs) {
                if (doc.current === true) {
                    currentIndex = doc.index;
                }
            }
            this._getContentByDocIndex(currentIndex);

            $('#Documents').height(AP.height);
        }

        _handleEvents() {

        }

        _addComment(){
            let url = AP.Constant.GET_INFOR + '?name=' + localStorage.name;
            let callback = (result) => {
                let infor = result.result.infor;
                let comment = {
                    name: infor.name,
                    face: infor.face,
                    time: new Date().toISOString().split('.')[0].replace(/T/g,' '),
                    comment: $('.commentContent').val().trim(),
                };
                $('.commentContent').val('');
                this.vue.currentDoc.comments.push(comment);
                this._updateCommentToDB();
            };
            AP.Ajax.get(url, callback);
        }

        _addLike(){
            if(this.vue.currentDoc.like.indexOf(localStorage.name) === -1){
                this.vue.currentDoc.like.push(localStorage.name);
                this._updateCommentToDB();
            }else{
                new AP.Message('infor', '你已经赞过了。');
            }
        }

        _changeDoc(e) {
            let name = $(e.target).text();
            let currentIndex = '';
            for (let doc of this.vue.docs) {
                if (doc.name === name) {
                    doc.current = true;
                    currentIndex = doc.index;
                } else {
                    doc.current = false;
                }
            }
            this._getContentByDocIndex(currentIndex);
        }

        _updateCommentToDB() {
            let url = AP.Constant.UPDATE_COMMENT;
            let postData = this.vue.currentDoc;
            let callback = (result) => {

            };
            AP.Ajax.post(url, postData, callback);
        }

        _initCommentToDB(index) {
            let comment = {
                index: index,
                read: 0,
                like: [],
                comments: []
            };
            let url = AP.Constant.SAVE_COMMENT;
            let postData = comment;
            let callback = (result) => {
                this._getCommentByIndex(index);
            };
            AP.Ajax.post(url, postData, callback);
        }

        _getCommentByIndex(index) {
            let url = AP.Constant.GET_COMMENT + '?index=' + index;
            let callback = (result) => {
                if (!result.result) {
                    this._initCommentToDB(index);
                } else {
                    this.vue.currentDoc = result.result;
                    this.vue.currentDoc.read += 1;
                    this._updateCommentToDB();
                }
            };
            AP.Ajax.get(url, callback);
        }

        _getContentByDocIndex(index) {
            let $container = $('.docContent');
            let url = AP.Constant.BASE_SERVER + `modules/document/docs/${ index }.html`;
            let callback = (result) => {
                this._getCommentByIndex(index);
            };
            AP.Ajax.loadHTML($container, url, callback)
        }
    }

    return controller;
});
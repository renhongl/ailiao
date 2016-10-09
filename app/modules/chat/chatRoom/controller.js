
define(['Controller'], function (Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue() {
            let that = this;
            let config = {
                el: '.chatRoom',
                data: {
                    chattings: [],
                    current: {},
                    records: {
                        you: "",
                        notYou: "",
                        records: [],
                    },
                    sendContent: '',
                    you: {

                    },
                    msgView: true,
                },
                methods: {
                    selectChatting: that._selectChatting.bind(that),
                    removeChatting: that._removeChatting.bind(that),
                    sendTo: that._sendTo.bind(that),
                },
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            // this._getYourInfor();
            // this._getCurrentInfor();
        }

        _handleEvents() {
            // setInterval(() => {
            //     this._saveRecords();
            // }, 10000)

            $.subscribe('addChatting', (o, args) => {
                $('#ChatRoom').show();
                this._addChatting(args);
            });

            $('#ChatRoom .glyphicon-remove').on('click', (e) => {
                this.vue.chattings = [];
            });

            $(document).on('keyup', (e) => {
                if (e.keyCode === 13 && this.vue.current.status !== '/images/offline.jpg') {
                    this._sendTo();
                }
            });

            window.onbeforeunload = () => {
                this._saveRecords();
            }

            let name = localStorage.name;
            AP.socket.on(name, (msg) => {
                if(this.vue.you.name === msg.from){
                    this.vue.current.name = msg.to;
                }else{
                    this.vue.current.name = msg.from;
                    if(this.vue.msgView){
                        new AP.Message('message', {fromUser: msg.from, content: msg.content});
                    }
                }

                if($('#ChatRoom').css('display') !== 'block'){
                    this._addChatting({name: this.vue.current.name});
                }
                
                this._getYourInfor();
                this._getCurrentInfor();

                setTimeout(() => {
                    let record = {
                        time: new Date().toISOString().split('.')[0].replace(/T/g,' '),
                        name: msg.from,
                        face: msg.from === this.vue.you.name ? this.vue.you.face : this.vue.current.face,
                        content: msg.content,
                    };
                    this.vue.records.you = this.vue.you.name;
                    this.vue.records.notYou = this.vue.current.name;
                    this.vue.records.records.push(record);
                    setTimeout(function () {
                        $('.chatContent').scrollTop($('.chatContent')[0].scrollHeight + 100);
                    }, 100);
                }, 500);
            });
        }

        _saveRecords(){
            let url = AP.Constant.SAVERECORDS;
            let postData = {
                records: this.vue.records,
            };
            let callback = (result) => {
                console.log(result);
            };
            AP.Ajax.post(url, postData, callback);
        }

        _getCurrentInfor() {
            let name = this.vue.current.name;
            let url = AP.Constant.GETINFOR + '?name=' + name;
            let callback = (result) => {
                this.vue.current = result.result.infor;
                this.vue.current.current = true;
            };
            AP.Ajax.get(url, callback);
        }

        _getYourInfor() {
            let name = localStorage.name;
            let url = AP.Constant.GETINFOR + '?name=' + name;
            let callback = (result) => {
                this.vue.you = result.result.infor;
            };
            AP.Ajax.get(url, callback);
        }

        _sendTo() {
            if (this.vue.sendContent.trim() !== '') {
                AP.socket.emit('forward', this.vue.you.name, this.vue.current.name, this.vue.sendContent);
                this.vue.sendContent = '';
            }
        }

        _getRecords() {
            let url = AP.Constant.GETRECORDS;
            let postData = {
                you: this.vue.records.you,
                notYou: this.vue.records.notYou,
            };
            let callback = (result) => {
                if (result.result) {
                    this.vue.records.records = result.result.records;
                } else {
                    this.vue.records.records = [];
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _removeChatting(e) {
            let name = $(e.target).parent().find('.chattingName').text() || this.vue.current.name;
            let tempChattings = [];
            for (let one of this.vue.chattings) {
                if (one.name !== name) {
                    tempChattings.push(one);
                }
            }
            this.vue.chattings = tempChattings;
            if (this.vue.chattings.length === 0) {
                $('#ChatRoom').hide();
            }
            if($(e.target).parent().find('.chattingName').text() === ''){
                let current = this.vue.chattings[this.vue.chattings.length - 1].name;
                this._addChatting({name: current});
            }
        }

        _selectChatting(e) {
            this._saveRecords();
            let name = $(e.target).parent().find('.chattingName').text();
            for (let one of this.vue.chattings) {
                if (one.name === name) {
                    one.current = true;
                    this.vue.current = one;
                    this.vue.records.you = localStorage.name;
                    this.vue.records.notYou = this.vue.current.name;
                } else {
                    one.current = false;
                }
            }

            this._getRecords();
            this._getYourInfor();
            this._getCurrentInfor();
        }

        _addChatting(args) {
            this._saveRecords();
            $('#ChatRoom').show();
            let url = AP.Constant.QUERYBYNAME + '?name=' + args.name;
            let callback = (result) => {
                let chatting = result.result;
                let allUsers = [];
                for (let one of this.vue.chattings) {
                    if (one.name === chatting.name) {
                        one.current = true;
                    } else {
                        one.current = false;
                    }
                    allUsers.push(one.name);
                }
                chatting.current = true;
                this.vue.current = chatting;
                this.vue.records.you = localStorage.name;
                this.vue.records.notYou = this.vue.current.name;
                if (allUsers.indexOf(chatting.name) === -1) {
                    this.vue.chattings.push(chatting);
                }

                this._getRecords();
                this._getYourInfor();
                this._getCurrentInfor();
            };
            AP.Ajax.get(url, callback);
        }
    }

    return controller;
});
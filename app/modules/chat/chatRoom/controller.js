
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
            
        }

        _handleEvents() {
            $.subscribe('addChatting', (o, args) => {
                this._addChatting(args);
                $('#ChatRoom').show();
            });

            $('#ChatRoom .glyphicon-remove').on('click', (e) => {
                this.vue.chattings = [];
            });

            let name = localStorage.name;
            AP.socket.emit('message', name + '连接了');
            AP.socket.on(name, (content) => {
                console.log(content);
            });

            AP.socket.on('error', function(e){
                console.log(e);
            });

            AP.socket.on('message',function(content){
                console.log(content);
            });
            
        }

        _sendTo(){
            AP.socket.emit('forward',localStorage.name, this.vue.current.name, this.vue.sendContent);
        }

        _getRecords() {
            let url = AP.Constant.GETRECORD;
            let postData = {
                you: this.vue.records.you,
                notYou: this.vue.records.notYou,
            };
            let callback = (result) => {
                if(result.result){
                    this.vue.records.records = result.result.records;
                }else{
                    this.vue.records.records = [];
                }
            };
            AP.Ajax.post(url, postData, callback);
        }

        _removeChatting(e) {
            let name = $(e.target).parent().find('.chattingName').text();
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
        }

        _selectChatting(e) {
            let name = $(e.target).parent().find('.chattingName').text();
            for (let one of this.vue.chattings) {
                if (one.name === name) {
                    one.current = true;
                    this.vue.current = one;
                    this.vue.records.you = localStorage.name;
                    this.vue.records.notYou = this.vue.current.name;
                    this._getRecords();
                } else {
                    one.current = false;
                }
            }
        }

        _addChatting(args) {
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
                this._getRecords();
                if (allUsers.indexOf(chatting.name) === -1) {
                    this.vue.chattings.push(chatting);
                }
            };
            AP.Ajax.get(url, callback);
        }
    }

    return controller;
});
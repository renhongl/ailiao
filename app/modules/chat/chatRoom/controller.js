
define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let that = this;
            let config = {
                el: '.chatRoom',
                data: {
                    chattings: [],
                    current: {},
                    removing: false,
                },
                methods: {
                    selectChatting: that._selectChatting.bind(that),
                    removeChatting: that._removeChatting.bind(that),
                }
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            console.log(this.vue.chattings);
        }

        _handleEvents() {
            $.subscribe('addChatting', (o, args) =>{
                this._addChatting(args);
            });
           
        }

        _removeChatting(e){
            let name = $(e.target).parent().find('.chattingName').text();
            let tempChattings = [];
            for(let one of this.vue.chattings){
                if(one.name !== name ){
                    tempChattings.push(one);
                }
            }
            this.vue.chattings = tempChattings;
        }

        _selectChatting(e){
            let name = $(e.target).parent().find('.chattingName').text();
            for(let one of this.vue.chattings){
                if(one.name === name){
                    one.current = true;
                    this.vue.current = one;
                }else{
                    one.current = false;
                }
            }
        }

        _addChatting(args){
            let url = AP.Constant.QUERYBYNAME + '?name=' + args.name;
            let callback = (result) => {
                let chatting = result.result;
                let allUsers = [];
                for(let one of this.vue.chattings){
                    if(one.name === chatting.name){
                        one.current = true;
                    }else{
                        one.current = false;
                    }
                    allUsers.push(one.name);
                }
                chatting.current = true;
                this.vue.current = chatting;
                if(allUsers.indexOf(chatting.name) === -1){
                    this.vue.chattings.push(chatting);
                }
            };
            AP.Ajax.get(url, callback);
        }
    }

    return controller;
});

define(['Controller'], function(Controller) {
    'use strict';
    class controller extends Controller {
        constructor(obj, $container, config) {
            super(obj, $container, config);
        }

        _runVue(){
            let that = this;
            let config = {
                el: '.chess',
                data: {
                    fromYou: false,
                    waite: false,
                    container: this.config.container,
                    other: '',
                },
                methods: {
                    putOne: that._putOne.bind(that),
                },
            };
            this.vue = new AP.Vue(config);
        }

        _renderTree() {
            
        }

        _handleEvents() {
            $.subscribe('fromYou', () => {
                this.vue.fromYou = true;
            });

            AP.socket.on('refresh', (from,to, container) => {
                debugger;
                if(from !== localStorage.name){
                    this.vue.waite = false;
                }
                this.vue.container = container;
            });

            
        }

        _putOne(e){
            if(!this.vue.waite){
                let row = Math.floor($('.chessContainer div').index($(e.target)) / 20);
                let col = $('.chessContainer div').index($(e.target)) % 20;
                if(row < 0 || col < 0){
                    new AP.Message('infor', '这里已经走过了。');
                    return;
                }
                let newRow = [];
                for(let [index, value] of this.vue.container[row].entries()){
                    newRow[index] = value;
                }
                if(newRow[col] === 0){
                    if(this.vue.fromYou){
                        newRow[col] = 1;
                    }else{
                        newRow[col] = 2;
                    }
                    this.vue.container.$set(row,newRow);
                    AP.socket.emit('putOne', localStorage.name, this.vue.container);
                    this.vue.waite = true;
                }else{
                    new AP.Message('infor', '这里已经走过了。');
                }
            }else{
                new AP.Message('infor', '该对手走。');
            }
        }
    }

    return controller;
});
/**
 * 观察者模式的jquery实现。
 * 因为需要全局中使用，并且不需要多次加载此模块，所以在Main类中创建一次即可。
 * 1: 增加jquery功能，$.publish代表发布，$.subscribe代表订阅，$.unsubscribe代表取消订阅。
 */
define([], function () {
    'use strict';
    class Observer{
        constructor(){
            this.O = $({});
            this._createPlugins();
        }

        _createPlugins(){
            let O = this.O;
            $.extend({
                publish(topic, data){
                    O.trigger(topic, data);
                },
                subscribe(topic, callback){
                    O.on(topic, callback);
                },
                unsubscribe(topic){
                    O.off(topic);
                }
            });
        }
    }

    let observer = new Observer();
    return observer;
});

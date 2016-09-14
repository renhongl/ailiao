/**
 * 显示button的提示功能。
 * 只有一个静态方法，使用时，调用tipy方法，传入一个需要提示的button元素。
 * 在此元素中必须有一个tipy属性用于自定义提示信息。
 */
define([], function(require, factory) {
    'use strict';
    class Tipy{
        static tipy($button){
            let msg = $button.attr('tipy') || 'No msg';
            let $tip = $(`<div class='tipyFoot'></div><div class='tipy'>${ msg }</div>`);
            let len = msg.length;
            
            $button.on('mouseover', (e) => {
                $button.append($tip);
                $('.tipy').width(15 * len + 5 + 'px').css('font-size', '10px');
            });

            $button.on('mouseout', (e) => {
                $tip.remove();
            });
        }
    }

    return Tipy;
});
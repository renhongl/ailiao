/**
 * 
 */
define([], function(require, factory) {
    'use strict';
    class Tipy{
        static tipy($button){
            let msg = $button.attr('tipy');
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